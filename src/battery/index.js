import prisma from "../app.js"
import * as ResponseHelper from "../helpers/response.js";
import * as ValidationHelper from "../helpers/validation/noJsLoggers.js";
import { fetchLogger, deleteLogger } from "./api.js";


const dataToFormatDb = async (datas) => {
  return await datas.map((el) => {
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
    }
    const energy = {
      edl1: el.edl1,
      edl2: el.edl2,
      edl3: el.edl3,
      eh1: el.eh1,
      eh2: el.eh2,
      eh3: el.eh3,
    }
    const pv = {
      pv1Volt: el.pv1_volt,
      pv2Volt: el.pv2_volt,
      pv3Volt: el.pv3_volt,
      pv1Curr: el.pv1_curr,
      pv2Curr: el.pv2_curr,
      pv3Curr: el.pv3_curr,
    }
    let dock = {}
    el.dvc.map((e, i) => {
      return (dock[`dock${i + 1}`] = e);
    });
    // add to dockCell
    let dockCell = {
      dockMax: el.max_battv[0],
      valueMax: el.max_battv[1],
      dockMin: el.min_battv[0],
      valueMin: el.min_battv[1],
      ...dock,
    };
    return {logger, energy, pv, dockCell}
  })
}

// validation data
const validateNojsLoggers = async (datas) => {
  try {
    const parseToFormatDb = await dataToFormatDb(datas);
    // validate logger
    const resultLogger = parseToFormatDb.map((el) => {
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
    return resultLogger;
  } catch (error) {
    console.error("Error validating nojs loggers:", error);
    return {
      status: "error",
    };
  }
};

// Add nojsLoggers
const createNojsLoggers = async (nojsId) => {
  // Fetch logger data
  const loggerData = await fetchLogger();
  
  if (loggerData === null) {
    return ResponseHelper.errorMessage("Failed to fetch logger data", 500);
  }

  if (loggerData.length > 0) {
    // validate nojsLoggers
    const validData = await validateNojsLoggers(loggerData);

    if (validData.every((data) => data.status === "success")) {
      console.log("All data validated successfully");

      for (const element of validData) {
        try {
          // Insert Energy
          const energyId = await prisma.energy.create({
            data: {
              edl1: element.energy?.edl1 ?? null,
              edl2: element.energy?.edl2 ?? null,
              edl3: element.energy?.edl3 ?? null,
              eh1: element.energy?.eh1 ?? null,
              eh2: element.energy?.eh2 ?? null,
              eh3: element.energy?.eh3 ?? null,
            },
            select: {
              id: true,
            },
          });

          // Insert DockCell
          const dockCellId = await prisma.dockCell.create({
            data: {
              dockMax: element.dockCell?.dockMax ?? null,
              valueMax: element.dockCell?.valueMax ?? null,
              dockMin: element.dockCell?.dockMin ?? null,
              valueMin: element.dockCell?.valueMin ?? null,
              dock1: element.dockCell?.dock1 ?? null,
              dock2: element.dockCell?.dock2 ?? null,
              dock3: element.dockCell?.dock3 ?? null,
              dock4: element.dockCell?.dock4 ?? null,
              dock5: element.dockCell?.dock5 ?? null,
              dock6: element.dockCell?.dock6 ?? null,
              dock7: element.dockCell?.dock7 ?? null,
              dock8: element.dockCell?.dock8 ?? null,
              dock9: element.dockCell?.dock9 ?? null,
              dock10: element.dockCell?.dock10 ?? null,
              dock11: element.dockCell?.dock11 ?? null,
              dock12: element.dockCell?.dock12 ?? null,
              dock13: element.dockCell?.dock13 ?? null,
              dock14: element.dockCell?.dock14 ?? null,
              dock15: element.dockCell?.dock15 ?? null,
              dock16: element.dockCell?.dock16 ?? null,
            },
            select: {
              id: true,
            },
          });

          // Insert PV
          const pvId = await prisma.pv.create({
            data: {
              pv1Volt: element.pv?.pv1Volt ?? null,
              pv2Volt: element.pv?.pv2Volt ?? null,
              pv3Volt: element.pv?.pv3Volt ?? null,
              pv1Curr: element.pv?.pv1Curr ?? null,
              pv2Curr: element.pv?.pv2Curr ?? null,
              pv3Curr: element.pv?.pv3Curr ?? null,
            },
            select: {
              id: true,
            },
          });

          // Insert Logger
          const logger = await prisma.nojsLogger.create({
            data: {
              ts: element.logger.ts,
              nojsId: nojsId,
              battVolt: element.logger.battVolt,
              cpuTemp: element.logger.cpuTemp,
              dockActive: element.logger.dockActive,
              load1: element.logger.load1,
              load2: element.logger.load2,
              load3: element.logger.load3,
              bspwatt: element.logger.bspwatt,
              mcbVoltage: element.logger.mcbVoltage,
              dockCellId: dockCellId.id,
              energyId: energyId.id,
              pvId: pvId.id,
            },
          });

          if (!logger) {
            throw new Error(
              `nojsID: ${nojsId} - ts: ${element.logger.ts} - Failed to create logger data`
            );
          } else {
            console.log(`nojsID: ${nojsId} - ts: ${element.logger.ts} - Logger data created successfully`);
            // delete logger data
            try {
              await deleteLogger(element.logger.ts);
              console.log("Logger data deleted successfully");
            } catch (error) {
              console.error("Error deleting logger data:", error);
              throw new Error("Failed to delete logger data");
            }
          }
        } catch (error) {
          console.error("Error creating logger data:", error);
          throw new Error(`Failed to create logger data`);
        }
      }
    } else {
      console.log("Some data failed validation");
      // Handle validation failures
      const failedData = validData.filter((data) => data.status === "failed");
      console.log(failedData);
    }
  } else {
    console.log("Logger data is empty");
  }
};

export { createNojsLoggers };
