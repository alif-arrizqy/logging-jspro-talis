import z from "zod";

const validationCreateSite = () => {
  return z.object({
    nojs: z.string().min(1, { message: "nojs cannot be empty" }),
    site: z.string().min(1, { message: "site cannot be empty" }),
    ip: z.string().nullable(),
    lc: z.string().nullable(),
    gs: z.string().nullable(),
    mitra: z.string().nullable(),
    provinsi: z.string().nullable(),
    kota: z.string().nullable(),
    latitude: z.string().nullable(),
    longitude: z.string().nullable(),
    ehubVersion: z.string().nullable(),
    panel2Type: z.string().nullable(),
    mpptType: z.string().nullable(),
    talisVersion: z.boolean().nullable(),
  });
};

export { validationCreateSite };