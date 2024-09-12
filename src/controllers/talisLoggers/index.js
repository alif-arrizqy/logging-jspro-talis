import prisma from "../app.js";
import * as ResponseHelper from "../helpers/response.js";
import {
  taliSchemas,
  talisCellSchemas,
} from "../helpers/validation/talisValidation.js";
import { fetchLoggerTalis, deleteLoggerTalis } from "./api.js";

const dataToFormatDb = async (datas) => {
  return datas.map((el) => {
    const talis = {
      ts: el.ts,
      threadId: el.thread_id,
      errorMessages: el.error_messages,
      pcbCode: el.pcb_code,
      sn1Code: el.sn1_code,
      packVoltage: el.pack_voltage,
      packCurrent: el.pack_current,
      remainingCapacity: el.remaining_capacity,
      averageCellTemperature: el.average_cell_temperature,
      environmentTemperature: el.environment_temperature,
      warningFlag: el.warning_flag,
      protectionFlag: el.protection_flag,
      faultStatus: el.fault_status_flag,
      soc: el.soc,
      soh: el.soh,
      fullChargedCapacity: el.full_charged_capacity,
      cycleCount: el.cycle_count,
      maxCellVoltage: el.max_cell_voltage,
      minCellVoltage: el.min_cell_voltage,
      cellDifference: el.cell_difference,
      maxCellTemperature: el.max_cell_temperature,
      minCellTemperature: el.min_cell_temperature,
      fetTemperature: el.fet_temperature,
      cellTemperature1: el.cell_temperature[0],
      cellTemperature2: el.cell_temperature[1],
      cellTemperature3: el.cell_temperature[2],
      ambientTemperature: el.ambient_temperature,
      remainingChargeTime: el.remaining_charge_time,
      remainingDischargeTime: el.remaining_discharge_time,
    };

    const talisCellPack = el.cell_voltage.reduce((acc, e, i) => {
      acc[`cell${i + 1}`] = e;
      return acc;
    }, {});

    return { talis, talisCellPack };
  });
};

const validateTalisLoggers = async (datas) => {
  try {
    const parsedData = await dataToFormatDb(datas);
    return parsedData.map((el) => {
      const validLogger = taliSchemas().safeParse(el.talis);
      const validCell = talisCellSchemas().safeParse(el.talisCellPack);
      return {
        status: validLogger.success && validCell.success ? "success" : "failed",
        talisLogger: validLogger.data,
        talisCell: validCell.data,
        errors: {
          loggerErrors: validLogger.error,
          cellErrors: validCell.error,
        },
      };
    });
  } catch (error) {
    console.error("Error validating talis loggers:", error);
    return { status: "error" };
  }
};

const createTalisLoggers = async (nojsId) => {
  try {
    const loggerData = await fetchLoggerTalis();
    if (loggerData.code !== 200) {
      return ResponseHelper.errorMessage("Failed to fetch logger data", 500);
    }

    if (loggerData.data.length === 0) {
      console.log("Talis logger data is empty");
      return;
    }

    const validatedData = await validateTalisLoggers(loggerData.data);
    if (!validatedData.every((data) => data.status === "success")) {
      console.log("Some data failed to validate");
      const failedData = validatedData.filter(
        (data) => data.status === "failed"
      );
      console.log(failedData);
      return;
    }

    console.log("All data validated successfully");

    for (const element of validatedData) {
      try {
        const bmsCellId = await prisma.bmsCellVoltage.create({
          data: element.talisCell,
          select: { id: true },
        });

        const talisLogger = await prisma.bmsLogger.create({
          data: {
            ...element.talisLogger,
            nojsId,
            cellVoltageId: bmsCellId.id,
          },
        });

        if (!talisLogger) {
          throw new Error(
            `nojsId: ${nojsId} - ts: ${element.talisLogger.ts} - Failed to create talis logger data`
          );
        }

        console.log(
          `nojsId: ${nojsId} - ts: ${element.talisLogger.ts} - Talis logger data created successfully`
        );

        const deletedLogger = await deleteLoggerTalis(element.talisLogger.ts);
        if (deletedLogger) {
          console.log(
            `nojsId: ${nojsId} - ts: ${element.talisLogger.ts} - Logger data deleted successfully`
          );
        } else {
          console.log(
            `nojsId: ${nojsId} - ts: ${element.talisLogger.ts} - Failed to delete logger data`
          );
        }
      } catch (error) {
        console.error("Error inserting talis logger data:", error);
        return ResponseHelper.errorMessage(
          "Failed to insert talis logger data",
          500
        );
      }
    }
  } catch (error) {
    console.error("Error in createTalisLoggers:", error);
    return ResponseHelper.errorMessage("Failed to create talis loggers", 500);
  }
};

export { createTalisLoggers };
