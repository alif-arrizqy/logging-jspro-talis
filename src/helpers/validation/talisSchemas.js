import z from "zod";

const taliSchemas = () => {
  return z.object({
    ts: z.string(),
    nojsId: z.number(),
    errorMessages: z.array(z.string()).optional(),
    pcbCode: z.string(),
    sn1Code: z.string().optional(),
    packVoltage: z.number(),
    packCurrent: z.number(),
    remainingCapacity: z.number(),
    averageCellTemperature: z.number(),
    environmentTemperature: z.number(),
    warningFlag: z.string(),
    protectionFlag: z.string(),
    faultStatus: z.string(),
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
    cellCemperature1: z.number(),
    cellCemperature2: z.number(),
    cellCemperature3: z.number(),
    ambientTemperature: z.number(),
    remainingChargeTime: z.number(),
    remainingDischargeTime: z.number(),
  });
};

const talisCellSchemas = () => {
  return z.object({
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
};

export { taliSchemas, talisCellSchemas };
