import prisma from "../app.js";
import * as ResponseHelper from "../helpers/response.js";
import * as ValidationHelper from "../helpers/validation/noJsLoggers.js";
import { fetchLogger, deleteLogger } from "./api.js";

const dataToFormatDb = async (datas) => {
  return datas.map((el) => {
    const logger = {
      ts: el.ts,
      battVolt: el.batt_volt,
      cpuTemp: el.cpu_temp,
      dockActive: el.dock_active,
      load1: el.load1,
      load2: el.load2,
      load3: el.load3,
      bspwatt: el.bspwatt,
      mcbVoltage: el.mcb_voltage,
    };
    const energy = {
      edl1: el.edl1,
      edl2: el.edl2,
      edl3: el.edl3,
      eh1: el.eh1,
      eh2: el.eh2,
      eh3: el.eh3,
    };
    const pv = {
      pv1Volt: el.pv1_volt,
      pv2Volt: el.pv2_volt,
      pv3Volt: el.pv3_volt,
      pv1Curr: el.pv1_curr,
      pv2Curr: el.pv2_curr,
      pv3Curr: el.pv3_curr,
    };
    let dock = {};
    el.cellv.forEach((e, i) => {
      dock[`dock${i + 1}`] = e;
    });
    const dockCell = {
      dockMax: el.max_battv[0],
      valueMax: el.max_battv[1],
      dockMin: el.min_battv[0],
      valueMin: el.min_battv[1],
      ...dock,
    };
    return { logger, energy, pv, dockCell };
  });
};

const validateNojsLoggers = async (datas) => {
  try {
    const parsedData = await dataToFormatDb(datas);
    return parsedData.map((el) => {
      const validLogger = ValidationHelper.validationNoJsLoggers().safeParse(el.logger);
      const validEnergy = ValidationHelper.validationEnergy().safeParse(el.energy);
      const validPv = ValidationHelper.validationPv().safeParse(el.pv);
      const validDockCell = ValidationHelper.validationDockCell().safeParse(el.dockCell);

      if (validLogger.success && validEnergy.success && validPv.success && validDockCell.success) {
        return {
          status: "success",
          logger: validLogger.data,
          energy: validEnergy.data,
          pv: validPv.data,
          dockCell: validDockCell.data,
        };
      } else {
        return {
          status: "failed",
          logger: validLogger.error,
          energy: validEnergy.error,
          pv: validPv.error,
          dockCell: validDockCell.error,
        };
      }
    });
  } catch (error) {
    console.error("Error validating nojs loggers:", error);
    return { status: "error" };
  }
};

const createNojsLoggers = async (nojsId) => {
  try {
    const loggerData = await fetchLogger();
    if (!loggerData) {
      return ResponseHelper.errorMessage("Failed to fetch logger data", 500);
    }

    if (loggerData.length === 0) {
      console.log("Logger data is empty");
      return;
    }

    const validData = await validateNojsLoggers(loggerData);
    if (!validData.every((data) => data.status === "success")) {
      console.log("Some data failed validation");
      const failedData = validData.filter((data) => data.status === "failed");
      console.log(failedData);
      return;
    }

    console.log("All data validated successfully");

    for (const element of validData) {
      try {
        const energyId = await prisma.energy.create({
          data: element.energy,
          select: { id: true },
        });

        const dockCellId = await prisma.dockCell.create({
          data: element.dockCell,
          select: { id: true },
        });

        const pvId = await prisma.pv.create({
          data: element.pv,
          select: { id: true },
        });

        const logger = await prisma.nojsLogger.create({
          data: {
            ...element.logger,
            nojsId,
            dockCellId: dockCellId.id,
            energyId: energyId.id,
            pvId: pvId.id,
          },
        });

        if (!logger) {
          throw new Error(`nojsID: ${nojsId} - ts: ${element.logger.ts} - Failed to create logger data`);
        }

        console.log(`nojsID: ${nojsId} - ts: ${element.logger.ts} - Logger data created successfully`);

        await deleteLogger(element.logger.ts);
        console.log("Logger data deleted successfully");
      } catch (error) {
        console.error("Error creating logger data:", error);
        throw new Error("Failed to create logger data");
      }
    }
  } catch (error) {
    console.error("Error in createNojsLoggers:", error);
    throw new Error("Failed to create nojs loggers");
  }
};

export { createNojsLoggers };