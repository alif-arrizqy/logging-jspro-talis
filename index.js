import prisma from "./src/app.js";
import cron from "node-cron";
import { createPmsLoggers } from "../../src/controllers/pmsLoggers/index.js";
import { createTalisLoggers } from "../../src/controllers/talisLoggers/index.js";

console.log("Waiting for scheduled tasks 6 minutes...");

// Schedule tasks to be run on the server every 6 minutes
cron.schedule("*/6 * * * *", async () => {
  console.log("Running every 6 minutes");
  try {
    // Connect to the database
    await prisma.$connect();
    
    const nojsSite = 'JS999';

    // Talis loggers
    await createTalisLoggers(nojsSite);

    // PMS loggers
    await createPmsLoggers(nojsSite);

  } catch (err) {
    console.error("Error during scheduled task:", err.message);
    console.error("Stack trace:", err.stack);
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
    console.log("Database connection closed after scheduled task.");
  }
});
