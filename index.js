import prisma from "./src/app.js";

// Function to check Prisma connection and create site information
const main = async () => {
  try {
    await prisma.$connect();
    console.log("Database connection established.");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    console.error("Stack trace:", err.stack);
  } finally {
    await prisma.$disconnect();
    console.log("Database connection closed."); // Debugging statement
  }
};

// Execute the main function
main();
