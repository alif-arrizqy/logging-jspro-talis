import prisma from "../../src/app.js";
import { creareSiteInformation } from "../../src/other/noJsUsers/index.js"

// Function to check Prisma connection and create site information
const main = async () => {
  try {
    await prisma.$connect();
    console.log("Database connection established.");

    // Add site information
    const data = {
      nojs: "JS1",
      site: "sundaya testing",
      ip: "192.168.100.206",
      lc: "",
      gs: "",
      mitra: "",
      kota: "",
      provinsi: "",
      latitude: "",
      longitude: "",
      ehubVersion: "new",
      panel2Type: "new",
      mpptType: "mppt-srne",
      talisVersion: true,
    };

    // Insert site information
    const result = await creareSiteInformation(data);
    console.log(result);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
};

// Execute the main function
main();
