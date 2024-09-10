import prisma from "./src/app.js";
import cron from "node-cron";
import { createTalisLoggers } from "./src/talis/index.js";
import { createNojsLoggers } from "./src/battery/index.js";

console.log("Waiting for scheduled tasks 6 minutes...");

// Schedule tasks to be run on the server every 6 minutes
cron.schedule("*/6 * * * *", async () => {
  console.log("Running every 6 minutes");
  const noJsId = 1;

  try {
    // Connect to the database
    await prisma.$connect();

    // Talis loggers
    await createTalisLoggers(noJsId);

    // Nojs loggers
    await createNojsLoggers(noJsId);
  } catch (err) {
    console.error("Error during scheduled task:", err.message);
    console.error("Stack trace:", err.stack);
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
    console.log("Database connection closed after scheduled task.");
  }
});
