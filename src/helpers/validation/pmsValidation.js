import z from "zod";

const pmsLoggerSchema = () => {
  return z.object({
    ts: z.string(),
    battVolt: z.number().nullable(),
    cpuTemp: z.number().nullable(),
    dockActive: z.string().nullable(),
    load1: z.number().nullable(),
    load2: z.number().nullable(),
    load3: z.number().nullable(),
  });
};

const pmsCellSchema = () => {
  return z.object({
    voltage: z.number().nullable(),
    current: z.number().nullable(),
    cellMax: z.number().nullable(),
    valueMax: z.number().nullable(),
    cellMin: z.number().nullable(),
    valueMin: z.number().nullable(),
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
    cell15: z.number().nullable(),
    cell16: z.number().nullable(),
  });
};

const energySchema = () => {
  return z.object({
    edl1: z.number().nullable(),
    edl2: z.number().nullable(),
    edl3: z.number().nullable(),
    eh1: z.number().nullable(),
    eh2: z.number().nullable(),
    eh3: z.number().nullable(),
  });
};

const pvSchema = () => {
  return z.object({
    pv1Volt: z.number().nullable(),
    pv2Volt: z.number().nullable(),
    pv3Volt: z.number().nullable(),
    pv1Curr: z.number().nullable(),
    pv2Curr: z.number().nullable(),
    pv3Curr: z.number().nullable(),
  });
};

export { pmsLoggerSchema, pmsCellSchema, energySchema, pvSchema };
