import z from "zod";

const validationNoJsLoggers = () => {
  return z.object({
    ts: z.string(),
    battVolt: z.number(),
    cpuTemp: z.number(),
    dockActive: z.string(),
    load1: z.number().optional(),
    load2: z.number().optional(),
    load3: z.number().optional(),
    bspwatt: z.number().optional(),
    mcbVoltage: z.number().optional(),
  });
}

const validationDockCell = () => {
  return z.object({
    dockMax: z.number(),
    valueMax: z.number(),
    dockMin: z.number(),
    valueMin: z.number(),
    dock1: z.number().optional(),
    dock2: z.number().optional(),
    dock3: z.number().optional(),
    dock4: z.number().optional(),
    dock5: z.number().optional(),
    dock6: z.number().optional(),
    dock7: z.number().optional(),
    dock8: z.number().optional(),
    dock9: z.number().optional(),
    dock10: z.number().optional(),
    dock11: z.number().optional(),
    dock12: z.number().optional(),
    dock13: z.number().optional(),
    dock14: z.number().optional(),
    dock15: z.number().optional(),
    dock16: z.number().optional(),
  })
}

const validationEnergy = () => {
  return z.object({
    edl1: z.number().optional(),
    edl2: z.number().optional(),
    edl3: z.number().optional().optional(),
    eh1: z.number().optional(),
    eh2: z.number().optional(),
    eh3: z.number().optional(),
  })
}

const validationPv = () => {
  return z.object({
    pv1Volt: z.number().optional(),
    pv2Volt: z.number().optional(),
    pv3Volt: z.number().optional(),
    pv1Curr: z.number().optional(),
    pv2Curr: z.number().optional(),
    pv3Curr: z.number().optional(),
  })
}

export {
  validationNoJsLoggers,
  validationDockCell,
  validationEnergy,
  validationPv
}