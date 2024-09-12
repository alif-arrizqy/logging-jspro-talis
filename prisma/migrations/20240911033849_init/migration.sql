/*
  Warnings:

  - You are about to drop the column `threadId` on the `BmsLogger` table. All the data in the column will be lost.
  - You are about to drop the column `dockCellId` on the `NojsLogger` table. All the data in the column will be lost.
  - You are about to drop the `DockCell` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NojsLogger" DROP CONSTRAINT "NojsLogger_dockCellId_fkey";

-- AlterTable
ALTER TABLE "BmsLogger" DROP COLUMN "threadId",
ADD COLUMN     "slaveId" INTEGER;

-- AlterTable
ALTER TABLE "NojsLogger" DROP COLUMN "dockCellId",
ADD COLUMN     "pmsCellId" BIGINT,
ADD COLUMN     "pmsId" INTEGER;

-- DropTable
DROP TABLE "DockCell";

-- CreateTable
CREATE TABLE "PmsCell" (
    "id" BIGSERIAL NOT NULL,
    "dockMax" INTEGER,
    "valueMax" DOUBLE PRECISION,
    "dockMin" INTEGER,
    "valueMin" DOUBLE PRECISION,
    "dock1" INTEGER,
    "dock2" INTEGER,
    "dock3" INTEGER,
    "dock4" INTEGER,
    "dock5" INTEGER,
    "dock6" INTEGER,
    "dock7" INTEGER,
    "dock8" INTEGER,
    "dock9" INTEGER,
    "dock10" INTEGER,
    "dock11" INTEGER,
    "dock12" INTEGER,
    "dock13" INTEGER,
    "dock14" INTEGER,
    "dock15" INTEGER,
    "dock16" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PmsCell_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NojsLogger" ADD CONSTRAINT "NojsLogger_pmsCellId_fkey" FOREIGN KEY ("pmsCellId") REFERENCES "PmsCell"("id") ON DELETE CASCADE ON UPDATE CASCADE;
