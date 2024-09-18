/*
  Warnings:

  - Made the column `tvdId` on table `PmsLoggers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PmsLoggers" ALTER COLUMN "tvdId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PmsLoggers" ADD CONSTRAINT "PmsLoggers_tvdId_fkey" FOREIGN KEY ("tvdId") REFERENCES "TvdLoggers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
