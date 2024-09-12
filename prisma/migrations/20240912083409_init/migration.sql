/*
  Warnings:

  - Changed the type of `contactPerson` on the `SiteInfoDetail` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SiteInfoDetail" DROP COLUMN "contactPerson",
ADD COLUMN     "contactPerson" JSONB NOT NULL;
