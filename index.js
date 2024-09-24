import prisma from "./src/app.js";
import cron from "node-cron";
import { createPmsLoggers } from "./src/controllers/pmsLoggers/index.js";
import { createTalisLoggers } from "./src/controllers/talisLoggers/index.js";
import fetchSiteInformation from "./src/controllers/siteInformation/index.js";

console.log("Waiting for scheduled tasks 6 minutes...");

// Schedule tasks to be run on the server every 6 minutes
cron.schedule("*/6 * * * *", async () => {
  console.log("Running every 6 minutes");
  try {
    // Connect to the database
    await prisma.$connect();

    const siteInformation = await fetchSiteInformation();
    if (siteInformation.status === "error") {
      throw new Error(siteInformation.message);
    }

    // get nojs and ip
    siteInformation.data.forEach(async (site) => {
      const nojsSite = site.nojs;
      const ip = site.ip;

      // Talis loggers
      await createTalisLoggers(nojsSite, ip);

      // PMS loggers
      await createPmsLoggers(nojsSite, ip);
    });
  } catch (err) {
    console.error("Error during scheduled task:", err.message);
    console.error("Stack trace:", err.stack);
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
    console.log("Database connection closed after scheduled task.");
  }
});
