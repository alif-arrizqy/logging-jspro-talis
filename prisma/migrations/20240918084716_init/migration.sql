/*
  Warnings:

  - You are about to alter the column `ts` on the `PmsCell` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "PmsCell" ALTER COLUMN "ts" SET DATA TYPE VARCHAR(255);
