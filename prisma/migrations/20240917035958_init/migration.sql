/*
  Warnings:

  - You are about to drop the column `cellMax` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `cellMin` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `valueMax` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `valueMin` on the `PmsCell` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PmsCell" DROP COLUMN "cellMax",
DROP COLUMN "cellMin",
DROP COLUMN "valueMax",
DROP COLUMN "valueMin";

-- AlterTable
ALTER TABLE "PmsLoggers" ADD COLUMN     "cellMax" INTEGER,
ADD COLUMN     "cellMin" INTEGER,
ADD COLUMN     "valueMax" DOUBLE PRECISION,
ADD COLUMN     "valueMin" DOUBLE PRECISION;
