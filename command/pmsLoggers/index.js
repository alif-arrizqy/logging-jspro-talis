import prisma from "../../src/app.js";
import { createPmsLoggers } from "../../src/controllers/pmsLoggers/index.js";

const main = async () => {
  try {
    await prisma.$connect();
    console.log("Database connection established.");

    // Add nojsLoggers
    const nojsSite = "JS999";
    const resp = await createPmsLoggers(nojsSite);
    console.log(resp);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
};

main();