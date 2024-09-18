/*
  Warnings:

  - You are about to drop the column `pmsId` on the `PmsLoggers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PmsCell" ADD COLUMN     "dock" INTEGER;

-- AlterTable
ALTER TABLE "PmsLoggers" DROP COLUMN "pmsId";
