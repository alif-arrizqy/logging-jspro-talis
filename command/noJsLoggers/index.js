import prisma from "../../src/app.js";
import { createNojsLoggers } from "../../src/battery/index.js";

const main = async () => {
  try {
    await prisma.$connect();
    console.log("Database connection established.");

    // Add nojsLoggers
    const nojsId = 1;
    await createNojsLoggers(nojsId);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
};

main();