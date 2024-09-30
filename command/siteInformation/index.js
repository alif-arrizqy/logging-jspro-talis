import prisma from "../../src/app.js";
import {
  createSiteInformation,
  fetchSiteInformation,
  updateSiteInformation,
  deleteSiteInformation,
} from "../../src/controllers/siteInformation/index.js";

// Function to check Prisma connection and create site information
const main = async () => {
  try {
    await prisma.$connect();
    console.log("Database connection established.");

    // datas.forEach(async (data) => {
    //   // Insert site information
    //   const result = await createSiteInformation(data);
    //   console.log(result);
    // });

    // Add site information
    const data = {
      id: 1,
      site_id_name: "XXX001",
      name: "sundaya",
      onair_date: "2024-09-17",
      topo_sustain_date: "2024-09-17",
      gs_sustain_date: "2024-09-17",
      longitude: 132.64816,
      latitude: -1.28741,
      provinsi: "JAWA BARAT BARAT",
      kabupaten: "BOGOR",
      kecamatan: "Sentul",
      provider_gs: "PT. AJN Solusindo",
      address: "Jl. Raya Sentul No. 1",
      beam_provider: "IFORTE",
      cellular_operator: "TELKOMSEL",
      project_phase: "Batch 1 2019",
      build_year: "2024-09-01",
      version: "V3",
      webapp: "192.168.100.206",
      mini_pc: null,
      terminal_id: "20240917140303",
      scc: "3",
      nojs: "JS999",
      ip_gw_lc: "",
      ip_gw_gs: "192.168.100.1",
      ip_snmp: "192.168.100.206",
      subnet: "/24",
      panel2_type: "new",
      pjs: [
        {
          name: "Herman",
          phone: "081247792714",
        },
        {
          name: "Kosmas",
          phone: "082116297516",
        },
      ],
    }

    // Insert site information
    const result = await createSiteInformation(data);
    console.log(result);

    // fetch data by nojs
    // const result = await fetchSiteInformation('JS90')
    // console.log(result);

    // update
    // const result = await updateSiteInformation(data.nojs, data);
    // console.log(result);

    // delete
    // const result = await deleteSiteInformation(data.nojs);
    // console.log(result);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
};

// Execute the main function
main();
