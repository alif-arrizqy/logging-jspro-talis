/*
  Warnings:

  - You are about to drop the column `onair` on the `SiteInfoDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SiteInfoDetail" DROP COLUMN "onair",
ADD COLUMN     "onairDate" VARCHAR(255);
