import z from "zod";
import { pmsLoggersFormatter } from "../databaseFormatter.js";

const pmsLoggerSchema = z.object({
  ts: z.string(),
  battVolt: z.number().nullable(),
  cpuTemp: z.number().nullable(),
  dockActive: z.string().nullable(),
  cellMax: z.number().nullable(),
  valueMax: z.number().nullable(),
  cellMin: z.number().nullable(),
  valueMin: z.number().nullable(),
  load1: z.number().nullable(),
  load2: z.number().nullable(),
  load3: z.number().nullable(),
});

const pmsCellObject = z.object({
  ts: z.string(),
  dock: z.string().nullable(),
  voltage: z.number().nullable(),
  current: z.number().nullable(),
  cmosState: z.string().nullable(),
  dmosState: z.string().nullable(),
  tempCmos: z.number().nullable(),
  tempDmos: z.number().nullable(),
  tempTop: z.number().nullable(),
  tempMid: z.number().nullable(),
  tempBot: z.number().nullable(),
  cell1: z.number().nullable(),
  cell2: z.number().nullable(),
  cell3: z.number().nullable(),
  cell4: z.number().nullable(),
  cell5: z.number().nullable(),
  cell6: z.number().nullable(),
  cell7: z.number().nullable(),
  cell8: z.number().nullable(),
  cell9: z.number().nullable(),
  cell10: z.number().nullable(),
  cell11: z.number().nullable(),
  cell12: z.number().nullable(),
  cell13: z.number().nullable(),
  cell14: z.number().nullable(),
});

const pmsCellSchema = z.array(pmsCellObject);

const energySchema = z.object({
  edl1: z.number().nullable(),
  edl2: z.number().nullable(),
  edl3: z.number().nullable(),
  eh1: z.number().nullable(),
  eh2: z.number().nullable(),
  eh3: z.number().nullable(),
});

const pvSchema = z.object({
  pv1Volt: z.number().nullable(),
  pv2Volt: z.number().nullable(),
  pv3Volt: z.number().nullable(),
  pv1Curr: z.number().nullable(),
  pv2Curr: z.number().nullable(),
  pv3Curr: z.number().nullable(),
});

const tvdSchema = z.object({
  bspPower: z.number().nullable(),
  lvdVsat: z.number().nullable(),
  mcbVoltage: z.number().nullable(),
});

const validatePmsLoggers = async (datas) => {
  try {
    const parsedData = await pmsLoggersFormatter(datas);
    const result = {
      status: "success",
      data: {
        pmsLoggers: [],
        pmsCell: [],
        energy: [],
        pv: [],
        tvd: []
      },
      errors: [],
    };

    parsedData.forEach((el) => {
      const validPmsLoggers = pmsLoggerSchema.safeParse(el.logger);
      const validPmsCell = pmsCellSchema.safeParse(el.pmsCell);
      const validPv = pvSchema.safeParse(el.pv);
      const validEnergy = energySchema.safeParse(el.energy);
      const validTvd = tvdSchema.safeParse(el.tvd);

      // Check if all data is valid
      if (!validPmsLoggers.success || !validPmsCell.success || !validPv.success || !validEnergy.success) {
        result.status = "failed";
        result.errors.push({
          logger: validPmsLoggers.error,
          pmsCell: validPmsCell.error,
          pv: validPv.error,
          energy: validEnergy.error,
          tvd: validTvd.error
        });
        return;
      } else {
        result.data.pmsLoggers.push(validPmsLoggers.data);
        result.data.pmsCell.push(validPmsCell.data);
        result.data.pv.push(validPv.data);
        result.data.energy.push(validEnergy.data);
        result.data.tvd.push(validTvd.data);
      }
    });
    return result;
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export default validatePmsLoggers;
