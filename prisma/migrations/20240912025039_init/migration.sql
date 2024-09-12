/*
  Warnings:

  - You are about to drop the column `cmos_state` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dmos_state` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `temp_bot` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `temp_cmos` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `temp_dmos` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `temp_mid` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `temp_top` on the `PmsCell` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PmsCell" DROP COLUMN "cmos_state",
DROP COLUMN "dmos_state",
DROP COLUMN "temp_bot",
DROP COLUMN "temp_cmos",
DROP COLUMN "temp_dmos",
DROP COLUMN "temp_mid",
DROP COLUMN "temp_top",
ADD COLUMN     "cmosState" INTEGER,
ADD COLUMN     "dmosState" INTEGER,
ADD COLUMN     "tempBot" INTEGER,
ADD COLUMN     "tempCmos" INTEGER,
ADD COLUMN     "tempDmos" INTEGER,
ADD COLUMN     "tempMid" INTEGER,
ADD COLUMN     "tempTop" INTEGER;
