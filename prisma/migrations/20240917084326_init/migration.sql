/*
  Warnings:

  - You are about to drop the column `tvdId` on the `PmsLoggers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PmsLoggers" DROP CONSTRAINT "PmsLoggers_tvdId_fkey";

-- AlterTable
ALTER TABLE "PmsLoggers" DROP COLUMN "tvdId";
