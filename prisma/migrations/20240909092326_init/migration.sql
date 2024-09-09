/*
  Warnings:

  - You are about to drop the column `cellTemperature` on the `BmsLogger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BmsLogger" DROP COLUMN "cellTemperature",
ADD COLUMN     "cellTemperature1" INTEGER,
ADD COLUMN     "cellTemperature2" INTEGER,
ADD COLUMN     "cellTemperature3" INTEGER;
