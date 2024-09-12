/*
  Warnings:

  - You are about to alter the column `nojsId` on the `SiteInfoDetail` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[nojsId]` on the table `SiteInfoDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "SiteInfoDetail" DROP CONSTRAINT "SiteInfoDetail_nojsId_fkey";

-- AlterTable
ALTER TABLE "SiteInfoDetail" ALTER COLUMN "nojsId" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "UNIQUE_NOJS_NOJSID" ON "SiteInfoDetail"("nojsId");

-- AddForeignKey
ALTER TABLE "SiteInfoDetail" ADD CONSTRAINT "SiteInfoDetail_nojsId_fkey" FOREIGN KEY ("nojsId") REFERENCES "SiteInformation"("nojs") ON DELETE CASCADE ON UPDATE CASCADE;
