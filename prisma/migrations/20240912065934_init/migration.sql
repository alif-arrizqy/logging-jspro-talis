/*
  Warnings:

  - You are about to drop the column `cellular_operator` on the `SiteInfoDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SiteInfoDetail" DROP COLUMN "cellular_operator",
ADD COLUMN     "cellularOperator" VARCHAR(255);
