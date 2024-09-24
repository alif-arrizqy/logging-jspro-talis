import prisma from "../../app.js";
import { tsFormatter } from "../../helpers/timestampFormatter.js";
import * as ResponseHelper from "../../helpers/responseHelper.js";
import validateTalisLoggers from "../../helpers/validationSchema/talisValidation.js";
import { fetchLoggerTalis, deleteLoggerTalis } from "../../helpers/fetchApiHelper.js";

const createBmsCellVoltage = async (talisCell) => {
  try {
    return await prisma.bmsCellVoltage.create({
      data: talisCell,
      select: { id: true },
    });
  } catch (error) {
    console.error("Error inserting bmsCellVoltage data:", error);
    throw new Error("Failed to insert bmsCellVoltage data");
  }
};

const createBmsLogger = async (talisLogger, nojsSite, cellVoltageId) => {
  try {
    return await prisma.bmsLoggers.create({
      data: {
        ...talisLogger,
        ts: tsFormatter(talisLogger.ts),
        nojsSite,
        cellVoltageId,
      },
    });
  } catch (error) {
    console.error("Error inserting bmsLogger data:", error);
    throw new Error("Failed to insert bmsLogger data");
  }
};

const handleDeleteLogger = async (ip, tsArray) => {
  const deleteResults = [];

  try {
    await Promise.all(
      tsArray.map(async (ts) => {
        try {
          const deleteResponse = await deleteLoggerTalis(ip, ts);

          if (deleteResponse === null) {
            console.log(`No response received from server for ts: ${ts}`);
          } else if (deleteResponse.code === 200) {
            console.log(`Talis logger data for ts: ${ts} deleted successfully`);
            deleteResults.push(ts);
          } else {
            console.log(`Failed to delete talis logger data for ts: ${ts}`);
          }
        } catch (error) {
          console.error(`Error deleting talis logger data for ts: ${ts}`, error);
        }
      })
    );
  } catch (error) {
    console.error("Error in handleDeleteLogger:", error);
  }

  return deleteResults;
};

const createTalisLoggers = async (nojsSite, ip) => {
  try {
    const loggerData = await fetchLoggerTalis(ip);

    if (loggerData === null) {
      console.log("No response received from server");
      return ResponseHelper.errorMessage("No response received from server", 404);
    }

    const validatedData = await validateTalisLoggers(loggerData.data);
    if (!validatedData.every((data) => data.status === "success")) {
      console.log("Some data failed to validate");
      const failedData = validatedData.filter((data) => data.status === "failed");
      console.log("failed validate data:", failedData);
      return ResponseHelper.errorMessage("Failed to validate talis loggers", 500);
    }

    console.log("All data validated successfully");

    const tsArray = [];
    const results = await Promise.all(
      validatedData.map(async (element) => {
        try {
          const bmsCellId = await createBmsCellVoltage(element.talisCell);
          const talisLogger = await createBmsLogger(element.talisLogger, nojsSite, bmsCellId.id);

          if (!talisLogger) {
            console.log(`nojsSite: ${nojsSite} - ts: ${element.talisLogger.ts} - Failed to create talis logger data`);
            return ResponseHelper.errorMessage("Failed to create talis logger data", 500);
          }

          // Add ts to tsArray if not already present
          if (!tsArray.includes(element.talisLogger.ts)) {
            tsArray.push(element.talisLogger.ts);
          }

          return null; // Return null for successful creation
        } catch (error) {
          console.error("Error processing talis logger data:", error);
          return ResponseHelper.errorMessage("Failed to process talis logger data", 500);
        }
      })
    );

    // Handle deletion of loggers
    const deleteResults = await handleDeleteLogger(ip, tsArray);

    if (deleteResults.length > 0) {
      return ResponseHelper.successMessage("Talis loggers created and delete successfully", 201);
    }
  } catch (error) {
    console.error("Error in createTalisLoggers:", error);
    return ResponseHelper.errorMessage("Failed to create talis loggers", 500);
  }
};

export { createTalisLoggers };