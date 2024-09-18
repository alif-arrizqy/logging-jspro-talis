/*
  Warnings:

  - You are about to alter the column `battVolt` on the `PmsLoggers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `valueMax` on the `PmsLoggers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `valueMin` on the `PmsLoggers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "PmsLoggers" ALTER COLUMN "battVolt" SET DATA TYPE INTEGER,
ALTER COLUMN "valueMax" SET DATA TYPE INTEGER,
ALTER COLUMN "valueMin" SET DATA TYPE INTEGER;
