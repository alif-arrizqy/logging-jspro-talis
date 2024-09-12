/*
  Warnings:

  - The `latitude` column on the `SiteInfoDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `longitude` column on the `SiteInfoDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SiteInfoDetail" ADD COLUMN     "ipGatewayGS" VARCHAR(255),
ADD COLUMN     "ipGatewayLC" VARCHAR(255),
ADD COLUMN     "subnet" VARCHAR(255),
DROP COLUMN "latitude",
ADD COLUMN     "latitude" INTEGER,
DROP COLUMN "longitude",
ADD COLUMN     "longitude" INTEGER;

-- AlterTable
ALTER TABLE "SiteInformation" ALTER COLUMN "ipMiniPc" DROP NOT NULL,
ALTER COLUMN "webapp" DROP NOT NULL;
