/*
  Warnings:

  - You are about to drop the column `subdistrict` on the `SiteInfoDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SiteInfoDetail" DROP COLUMN "subdistrict",
ADD COLUMN     "subDistrict" VARCHAR(255);
