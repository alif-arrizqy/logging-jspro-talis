import prisma from "../../src/app.js";
import { createTalisLoggers } from "../../src/controllers/talisLoggers/index.js";

const main = async () => {
  try {
    await prisma.$connect();
    console.log("Database connection established.");

    // Add nojsLoggers
    const nojsSite = "JS999";
    const resp = await createTalisLoggers(nojsSite);
    console.log(resp);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
};

main();
