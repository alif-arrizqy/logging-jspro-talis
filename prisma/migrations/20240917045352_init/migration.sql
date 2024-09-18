/*
  Warnings:

  - You are about to drop the column `nojsId` on the `BmsLoggers` table. All the data in the column will be lost.
  - You are about to drop the column `nojsId` on the `PmsLoggers` table. All the data in the column will be lost.
  - You are about to drop the column `nojsId` on the `SiteInfoDetail` table. All the data in the column will be lost.
  - You are about to drop the column `nojsId` on the `TvdLoggers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nojsSite]` on the table `SiteInfoDetail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nojsSite` to the `BmsLoggers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nojsSite` to the `PmsLoggers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nojsSite` to the `SiteInfoDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nojsSite` to the `TvdLoggers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PmsLoggers" DROP CONSTRAINT "PmsLoggers_nojsId_fkey";

-- DropForeignKey
ALTER TABLE "SiteInfoDetail" DROP CONSTRAINT "SiteInfoDetail_nojsId_fkey";

-- DropForeignKey
ALTER TABLE "TvdLoggers" DROP CONSTRAINT "TvdLoggers_nojsId_fkey";

-- DropIndex
DROP INDEX "nojsid_hash";

-- DropIndex
DROP INDEX "UNIQUE_NOJS_NOJSID";

-- AlterTable
ALTER TABLE "BmsLoggers" DROP COLUMN "nojsId",
ADD COLUMN     "nojsSite" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PmsLoggers" DROP COLUMN "nojsId",
ADD COLUMN     "nojsSite" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SiteInfoDetail" DROP COLUMN "nojsId",
ADD COLUMN     "nojsSite" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "TvdLoggers" DROP COLUMN "nojsId",
ADD COLUMN     "nojsSite" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "nojsid_hash" ON "PmsLoggers" USING HASH ("nojsSite");

-- CreateIndex
CREATE UNIQUE INDEX "UNIQUE_NOJS_NOJSID" ON "SiteInfoDetail"("nojsSite");

-- AddForeignKey
ALTER TABLE "TvdLoggers" ADD CONSTRAINT "TvdLoggers_nojsSite_fkey" FOREIGN KEY ("nojsSite") REFERENCES "SiteInformation"("nojs") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PmsLoggers" ADD CONSTRAINT "PmsLoggers_nojsSite_fkey" FOREIGN KEY ("nojsSite") REFERENCES "SiteInformation"("nojs") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteInfoDetail" ADD CONSTRAINT "SiteInfoDetail_nojsSite_fkey" FOREIGN KEY ("nojsSite") REFERENCES "SiteInformation"("nojs") ON DELETE CASCADE ON UPDATE CASCADE;
