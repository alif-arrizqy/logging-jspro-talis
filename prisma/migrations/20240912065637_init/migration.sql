-- DropForeignKey
ALTER TABLE "SiteInfoDetail" DROP CONSTRAINT "SiteInfoDetail_nojsId_fkey";

-- AlterTable
ALTER TABLE "SiteInfoDetail" ALTER COLUMN "nojsId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "SiteInfoDetail" ADD CONSTRAINT "SiteInfoDetail_nojsId_fkey" FOREIGN KEY ("nojsId") REFERENCES "SiteInformation"("nojs") ON DELETE CASCADE ON UPDATE CASCADE;
