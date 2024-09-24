import prisma from "../../app.js";
import * as ResponseHelper from "../../helpers/responseHelper.js";
import validatePmsLoggers from "../../helpers/validationSchema/pmsValidation.js";
import { fetchLogger, deleteLogger } from "../../helpers/fetchApiHelper.js";
import { tsFormatter } from "../../helpers/timestampFormatter.js";

const createPmsLoggers = async (nojsSite, ip) => {
  try {
    const loggerData = await fetchLogger(ip);

    if (loggerData === null) {
      console.log("No response received from server");
      return ResponseHelper.errorMessage(
        "No response received from server",
        404
      );
    }

    const validData = await validatePmsLoggers(loggerData.data);

    if (validData.status === "error") {
      return ResponseHelper.errorMessage("Failed to validated data", 400);
    }

    // insert pv and get id pv
    const pvIds = await Promise.all(
      validData.data.pv.map(async (element) => {
        const pv = await prisma.pv.create({
          data: element,
          select: { id: true },
        });
        return pv.id;
      })
    );

    // insert energy and get id energy
    const energyIds = await Promise.all(
      validData.data.energy.map(async (element) => {
        const energy = await prisma.energy.create({
          data: element,
          select: { id: true },
        });
        return energy.id;
      })
    );

    // insert pms cell and get id pms cell
    try {
      await Promise.all(
        validData.data.pmsCell.map(async (element, key) => {
          try {
            element.map(async (el) => {
              await prisma.pmsCell.create({
                data: {
                  ...el,
                  nojsSite: nojsSite,
                }
              });
            });
          } catch (error) {
            console.error(`Failed to insert data for pmsCell: ${element}`, error);
            throw new Error("Failed to insert data for pmsCell");
          }
        })
      );
      console.log("All pmsCell data inserted successfully");
    } catch (error) {
      console.error("Error in inserting pmsCell data:", error);
      return ResponseHelper.errorMessage("Failed to insert pmsCell data", 500);
    }

    // insert pms loggers
    try {
      await prisma.pmsLoggers.createMany({
        data: validData.data.pmsLoggers.map((val, key) => {
          return {
            ...val,
            ts: tsFormatter(val.ts),
            nojsSite: nojsSite,
            pvId: pvIds[key],
            energyId: energyIds[key],
          };
        }),
      });
      console.log("All pmsLoggers data inserted successfully");

      // delete logger
      const deleteLoggerResults = await Promise.all(
        validData.data.pmsLoggers.map(async (val) => {
          try {
            const deleteLoggerData = await deleteLogger(ip, val.ts);
            if (deleteLoggerData === null) {
              console.log(`No response received from server for ts: ${val.ts}`);
              return ResponseHelper.errorMessage("No response received from server", 404);
            } else if (deleteLoggerData.code === 200) {
              console.log(`Logger deleted successfully for ts: ${val.ts}`);
              return ResponseHelper.successMessage("Pms loggers created and deleted successfully", 201);
            } else {
              console.log(`Failed to delete logger for ts: ${val.ts}`);
              return ResponseHelper.errorMessage("Failed to delete logger", 500);
            }
          } catch (error) {
            console.error(`Error in deleting logger data for ts: ${val.ts}`, error);
            return ResponseHelper.errorMessage("Failed to delete logger data", 500);
          }
        })
      );

      // Check if any deleteLoggerResults contains an error message
      const hasError = deleteLoggerResults.some(result => result.status === "error");
      if (hasError) {
        return ResponseHelper.errorMessage("Some loggers failed to delete", 500);
      }

      return ResponseHelper.successMessage("Pms loggers created and deleted successfully", 201);
    } catch (error) {
      console.error("Error in inserting pmsLoggers data:", error);
      return ResponseHelper.errorMessage("Failed to insert pmsLoggers data", 500);
    }
  } catch (error) {
    console.log(error);
    return ResponseHelper.errorMessage("Failed to create pms loggers", 500);
  }
};

export { createPmsLoggers };
