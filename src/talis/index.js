import prisma from "../app.js";
import * as ResponseHelper from "../helpers/response.js";
import {
  taliSchemas,
  talisCellSchemas,
} from "../helpers/validation/talisSchemas.js";
import { fetchLoggerTalis, deleteLoggerTalis } from "./api.js";

const dataToFormatDb = async (datas) => {
  return await datas.map((el) => {
    console.log(el);
    const talisSchemas = {
      ts: el.ts,
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
      faultStatus: el.fault_status,
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
      cellCemperature1: el.cell_cemperature[0],
      cellCemperature2: el.cell_cemperature[1],
      cellCemperature3: el.cell_cemperature[2],
      ambientTemperature: el.ambient_temperature,
      remainingChargeTime: el.remaining_charge_time,
      remainingDischargeTime: el.remaining_discharge_time,
    };
    console.log(talisSchemas);

    let talisCellSchemas = {};
    el.cell_voltage.map((e, i) => {
      return (talisCellSchemas[`cell${i + 1}`] = e);
    });
    return { talisSchemas, talisCellSchemas };
  });
};


// validation data
const validateTalisLoggers = async (datas) => {
  try {
    const parseToFormatDb = await dataToFormatDb(datas);
    // validate logger
    const resultLogger = parseToFormatDb.map((el) => {
      const validLogger = taliSchemas().safeParse(el.talisSchemas);
      const validCell = talisCellSchemas().safeParse(el.talisCellSchemas);
      return {
        status: "success",
        talisLogger: validLogger.data,
        talisCell: validCell.data,
      };
    });
    return resultLogger;
  } catch (error) {
    return {
      status: "error"
    }
  }
};

// Add talisLoggers
const createTalisLoggers = async (nojsId) => {
  // Fetch logger data
  // const loggerData = await fetchLoggerTalis();
  const loggerData = [
    {
      ambient_temperature: 326,
      average_cell_temperature: 309,
      cell_difference: 2,
      cell_temperature: [309, 310, 310],
      cell_voltage: [
        3331, 3330, 3330, 3330, 3330, 3331, 3331, 3331, 3329, 3330, 3330, 3330,
        3331, 3330, 3329, 3330,
      ],
      cycle_count: 4,
      environment_temperature: 326,
      error_messages: [
        "Pack voltage 5328 exceeds limit 5325",
        "Max cell voltage 3331 exceeds limit 425 at indices [0, 5, 6, 7, 12]",
        "Min cell voltage 3329 exceeds limit 375 at indices [8, 14]",
        "Cell difference 2 below limit 5",
        "Max cell temperature 310 exceeds limit 240 at indices [1, 2]",
        "Min cell temperature 309 exceeds limit 230 at indices [0]",
        "FET temperature 300 exceeds limit 250",
      ],
      fault_status_flag: [
        "charge Mosfet ON",
        "discharge Mosfet ON",
        "charge limit current function is ON",
      ],
      fet_temperature: 300,
      full_charged_capacity: 100,
      max_cell_temperature: 310,
      max_cell_voltage: 3331,
      min_cell_temperature: 309,
      min_cell_voltage: 3329,
      pack_current: 0,
      pack_voltage: 5328,
      pcb_code: "TBI23122400277",
      protection_flag: ["no alarm detected"],
      remaining_capacity: 100,
      remaining_charge_time: 65535,
      remaining_discharge_time: 65535,
      sn1_code: "",
      soc: 10000,
      soh: 10000,
      thread_id: 1,
      ts: "20240909T155444",
      warning_flag: ["no alarm detected"],
    },
    {
      ambient_temperature: 326,
      average_cell_temperature: 309,
      cell_difference: 2,
      cell_temperature: [309, 310, 310],
      cell_voltage: [
        3331, 3330, 3330, 3330, 3330, 3331, 3331, 3331, 3329, 3330, 3330, 3330,
        3331, 3330, 3329, 3330,
      ],
      cycle_count: 4,
      environment_temperature: 326,
      error_messages: [
        "Pack voltage 5328 exceeds limit 5325",
        "Max cell voltage 3331 exceeds limit 425 at indices [0, 5, 6, 7, 12]",
        "Min cell voltage 3329 exceeds limit 375 at indices [8, 14]",
        "Cell difference 2 below limit 5",
        "Max cell temperature 310 exceeds limit 240 at indices [1, 2]",
        "Min cell temperature 309 exceeds limit 230 at indices [0]",
        "FET temperature 300 exceeds limit 250",
      ],
      fault_status_flag: [
        "charge Mosfet ON",
        "discharge Mosfet ON",
        "charge limit current function is ON",
      ],
      fet_temperature: 300,
      full_charged_capacity: 100,
      max_cell_temperature: 310,
      max_cell_voltage: 3331,
      min_cell_temperature: 309,
      min_cell_voltage: 3329,
      pack_current: 0,
      pack_voltage: 5328,
      pcb_code: "TBI23122400277",
      protection_flag: ["no alarm detected"],
      remaining_capacity: 100,
      remaining_charge_time: 65535,
      remaining_discharge_time: 65535,
      sn1_code: "",
      soc: 10000,
      soh: 10000,
      thread_id: 1,
      ts: "20240909T155444",
      warning_flag: ["no alarm detected"],
    }
  ];

  if (loggerData === null) {
    return ResponseHelper.errorMessage("Failed to fetch logger data", 500);
  }

  if (loggerData.length > 0) {
    // Validate logger data
    const validateLogger = await validateTalisLoggers(loggerData);
  
    // if (validateLogger.every((data) => data.status === "success")) {
    //   console.log("All data validated successfully");
  
    //   for (const element of validateLogger) {
    //     try {
    //       // Insert BmsCellVoltage
    //       // const bmsCellId = await prisma.bmsCellVoltage.create({
    //       //   data: {
    //       //     cell1: element.validCell.data.cell1,
    //       //   },
    //       // });
    //       console.log(element.talisLogger.data);
    //     } catch (error) {
    //       console.error("Error inserting bmsCellVoltage:", error);
    //       // return ResponseHelper.errorMessage("Failed to insert bmsCellVoltage", 500);
    //     }
    //   }
    // } else {
    //   console.log("Some data failed to validate");
    //   const failedData = validateLogger.filter((data) => data.status === "failed");
    //   console.log(failedData);
    // }
  } else {
    console.log("Talis logger data is empty");
  }

};

export { createTalisLoggers }