/*
  Warnings:

  - Made the column `ts` on table `PmsCell` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PmsCell" ALTER COLUMN "ts" SET NOT NULL;
