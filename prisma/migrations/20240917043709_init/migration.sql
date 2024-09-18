-- DropForeignKey
ALTER TABLE "PmsLoggers" DROP CONSTRAINT "PmsLoggers_nojsId_fkey";

-- DropForeignKey
ALTER TABLE "TvdLoggers" DROP CONSTRAINT "TvdLoggers_nojsId_fkey";

-- AlterTable
ALTER TABLE "PmsLoggers" ALTER COLUMN "nojsId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TvdLoggers" ALTER COLUMN "nojsId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "TvdLoggers" ADD CONSTRAINT "TvdLoggers_nojsId_fkey" FOREIGN KEY ("nojsId") REFERENCES "SiteInformation"("nojs") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PmsLoggers" ADD CONSTRAINT "PmsLoggers_nojsId_fkey" FOREIGN KEY ("nojsId") REFERENCES "SiteInformation"("nojs") ON DELETE CASCADE ON UPDATE CASCADE;
