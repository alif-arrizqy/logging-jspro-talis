/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `SiteInfoDetail` table. All the data in the column will be lost.
  - You are about to drop the column `pjsName` on the `SiteInfoDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SiteInfoDetail" DROP COLUMN "phoneNumber",
DROP COLUMN "pjsName",
ADD COLUMN     "contactPerson" VARCHAR(255)[];
