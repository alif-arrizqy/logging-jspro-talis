/*
  Warnings:

  - You are about to drop the column `pmsCellId` on the `PmsLoggers` table. All the data in the column will be lost.
  - Added the required column `nojsSite` to the `PmsCell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ts` to the `PmsCell` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PmsLoggers" DROP CONSTRAINT "PmsLoggers_pmsCellId_fkey";

-- AlterTable
ALTER TABLE "PmsCell" ADD COLUMN     "nojsSite" TEXT NOT NULL,
ADD COLUMN     "ts" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PmsLoggers" DROP COLUMN "pmsCellId";

-- AddForeignKey
ALTER TABLE "PmsCell" ADD CONSTRAINT "PmsCell_nojsSite_fkey" FOREIGN KEY ("nojsSite") REFERENCES "SiteInformation"("nojs") ON DELETE CASCADE ON UPDATE CASCADE;
