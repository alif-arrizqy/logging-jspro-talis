import z from "zod";

const contactPersonSchema = z.object({
  name: z.string().nullable(),
  phone: z.string().nullable(),
});

const siteInformationSchema = z.object({
  nojs: z.string().min(1, { message: "nojs cannot be empty" }),
  siteId: z.string().optional(),
  terminalId: z.string().optional(),
  siteName: z.string().min(1, { message: "site cannot be empty" }),
  ip: z.string().min(1, { message: "ip cannot be empty" }),
  ipMiniPc: z.string().nullable(),
  webapp: z.string().nullable(),
  ehubVersion: z.string().nullable(),
  panel2Type: z.string().nullable(),
  mpptType: z.string().nullable(),
  talisVersion: z.boolean().nullable(),
  tvdSite: z.boolean().nullable(),
});

const siteInfoDetailSchema = z.object({
  nojsId: z.string().min(1, { message: "nojs cannot be empty" }),
  ipGatewayLC: z.string().nullable(),
  ipGatewayGS: z.string().nullable(),
  subnet: z.string().nullable(),
  cellularOperator: z.string().nullable(),
  lc: z.string().nullable(),
  gs: z.string().nullable(),
  projectPhase: z.string().nullable(),
  buildYear: z.string().nullable(),
  onairDate: z.string().nullable(),
  topoSustainDate: z.string().nullable(),
  gsSustainDate: z.string().nullable(),
  contactPerson: z.array(contactPersonSchema).nullable(),
  address: z.string().nullable(),
  subDistrict: z.string().nullable(),
  district: z.string().nullable(),
  province: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
});

export { siteInformationSchema, siteInfoDetailSchema };
