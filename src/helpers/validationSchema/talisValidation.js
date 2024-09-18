import z from "zod";
import { talisLoggersFormatter } from "../../helpers/databaseFormatter.js";

const taliSchemas = z.object({
  ts: z.string(),
  slaveId: z.number(),
  errorMessages: z.array(z.string()).optional(),
  pcbCode: z.string(),
  sn1Code: z.string().optional(),
  packVoltage: z.number(),
  packCurrent: z.number(),
  remainingCapacity: z.number(),
  averageCellTemperature: z.number(),
  environmentTemperature: z.number(),
  warningFlag: z.array(z.string()),
  protectionFlag: z.array(z.string()),
  faultStatus: z.array(z.string()),
  soc: z.number(),
  soh: z.number(),
  fullChargedCapacity: z.number(),
  cycleCount: z.number(),
  maxCellVoltage: z.number(),
  minCellVoltage: z.number(),
  cellDifference: z.number(),
  maxCellTemperature: z.number(),
  minCellTemperature: z.number(),
  fetTemperature: z.number(),
  cellTemperature1: z.number(),
  cellTemperature2: z.number(),
  cellTemperature3: z.number(),
  ambientTemperature: z.number(),
  remainingChargeTime: z.number(),
  remainingDischargeTime: z.number(),
});

const talisCellSchemas = z.object({
  cell1: z.number().optional(),
  cell2: z.number().optional(),
  cell3: z.number().optional(),
  cell4: z.number().optional(),
  cell5: z.number().optional(),
  cell6: z.number().optional(),
  cell7: z.number().optional(),
  cell8: z.number().optional(),
  cell9: z.number().optional(),
  cell10: z.number().optional(),
  cell11: z.number().optional(),
  cell12: z.number().optional(),
  cell13: z.number().optional(),
  cell14: z.number().optional(),
  cell15: z.number().optional(),
  cell16: z.number().optional(),
});

const validateTalisLoggers = async (datas) => {
  try {
    const parsedData = await talisLoggersFormatter(datas);
    return parsedData.map((el) => {
      const validLogger = taliSchemas.safeParse(el.talis);
      const validCell = talisCellSchemas.safeParse(el.talisCellPack);
      return {
        status: validLogger.success && validCell.success ? "success" : "failed",
        talisLogger: validLogger.data,
        talisCell: validCell.data,
        errors: {
          loggerErrors: validLogger.error || null,
          cellErrors: validCell.error || null,
        },
      };
    });
  } catch (error) {
    console.error("Error validating talis loggers:", error);
    return { status: "error" };
  }
};

export default validateTalisLoggers;
