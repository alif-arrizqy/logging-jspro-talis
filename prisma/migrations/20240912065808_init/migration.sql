/*
  Warnings:

  - You are about to drop the column `cellularOperation` on the `SiteInfoDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SiteInfoDetail" DROP COLUMN "cellularOperation",
ADD COLUMN     "cellular_operator" VARCHAR(255);
