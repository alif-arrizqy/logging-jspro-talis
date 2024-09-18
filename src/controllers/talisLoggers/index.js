import prisma from "../../app.js";
import { tsFormatter } from "../../helpers/timestampFormatter.js";
import * as ResponseHelper from "../../helpers/responseHelper.js";
import validateTalisLoggers from "../../helpers/validationSchema/talisValidation.js"
import { fetchLoggerTalis, deleteLoggerTalis } from "../../helpers/fetchApiHelper.js";

const createTalisLoggers = async (nojsSite) => {
  try {
    const loggerData = await fetchLoggerTalis();
    if (loggerData === null) {
      console.log("No response received from server");
      return ResponseHelper.errorMessage("No response received from server", 404);
    }

    const validatedData = await validateTalisLoggers(loggerData.data);
    if (!validatedData.every((data) => data.status === "success")) {
      console.log("Some data failed to validate");
      const failedData = validatedData.filter(
        (data) => data.status === "failed"
      );
      console.log("failed validate data:", failedData);
      return ResponseHelper.errorMessage("Failed to validate talis loggers", 500);
    }

    console.log("All data validated successfully");

    for (const element of validatedData) {
      try {
        const bmsCellId = await prisma.bmsCellVoltage.create({
          data: element.talisCell,
          select: { id: true },
        });

        const talisLogger = await prisma.bmsLoggers.create({
          data: {
            ...element.talisLogger,
            ts: tsFormatter(element.talisLogger.ts),
            nojsSite,
            cellVoltageId: bmsCellId.id,
          },
        });

        if (!talisLogger) {
          console.log(
            `nojsSite: ${nojsSite} - ts: ${element.talisLogger.ts} - Failed to create talis logger data`
          );
          return ResponseHelper.errorMessage("Failed to create talis logger data", 500);
        }

        // return ResponseHelper.successMessage("Talis loggers created successfully", 200);

        const deletedLogger = await deleteLoggerTalis(element.talisLogger.ts);
        if (deletedLogger) {
          console.log(
            `nojsSite: ${nojsSite} - ts: ${element.talisLogger.ts} - Logger data deleted successfully`
          );
          return ResponseHelper.successMessage("Talis loggers created and deleted successfully", 200);
        } else {
          console.log(
            `nojsSite: ${nojsSite} - ts: ${element.talisLogger.ts} - Failed to delete logger data`
          );
          return ResponseHelper.errorMessage("Talis loggers created but failed to delete logger data", 500);
        }
      } catch (error) {
        console.error("Error inserting talis logger data:", error);
        return ResponseHelper.errorMessage("Failed to insert talis logger data",500);
      }
    }
  } catch (error) {
    console.error("Error in createTalisLoggers:", error);
    return ResponseHelper.errorMessage("Failed to create talis loggers", 500);
  }
};

export { createTalisLoggers };
