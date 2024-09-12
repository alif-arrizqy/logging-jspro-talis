/*
  Warnings:

  - You are about to drop the column `dock1` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dock10` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dock11` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dock12` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dock13` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dock14` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dock15` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dock16` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dock2` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dock3` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dock4` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dock5` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dock6` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dock7` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dock8` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dock9` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dockMax` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `dockMin` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the `BmsLogger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NojsLogger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NojsUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BmsLogger" DROP CONSTRAINT "BmsLogger_cellVoltageId_fkey";

-- DropForeignKey
ALTER TABLE "NojsLogger" DROP CONSTRAINT "NojsLogger_energyId_fkey";

-- DropForeignKey
ALTER TABLE "NojsLogger" DROP CONSTRAINT "NojsLogger_nojsId_fkey";

-- DropForeignKey
ALTER TABLE "NojsLogger" DROP CONSTRAINT "NojsLogger_pmsCellId_fkey";

-- DropForeignKey
ALTER TABLE "NojsLogger" DROP CONSTRAINT "NojsLogger_pvId_fkey";

-- AlterTable
ALTER TABLE "PmsCell" DROP COLUMN "dock1",
DROP COLUMN "dock10",
DROP COLUMN "dock11",
DROP COLUMN "dock12",
DROP COLUMN "dock13",
DROP COLUMN "dock14",
DROP COLUMN "dock15",
DROP COLUMN "dock16",
DROP COLUMN "dock2",
DROP COLUMN "dock3",
DROP COLUMN "dock4",
DROP COLUMN "dock5",
DROP COLUMN "dock6",
DROP COLUMN "dock7",
DROP COLUMN "dock8",
DROP COLUMN "dock9",
DROP COLUMN "dockMax",
DROP COLUMN "dockMin",
ADD COLUMN     "cell1" INTEGER,
ADD COLUMN     "cell10" INTEGER,
ADD COLUMN     "cell11" INTEGER,
ADD COLUMN     "cell12" INTEGER,
ADD COLUMN     "cell13" INTEGER,
ADD COLUMN     "cell14" INTEGER,
ADD COLUMN     "cell15" INTEGER,
ADD COLUMN     "cell16" INTEGER,
ADD COLUMN     "cell2" INTEGER,
ADD COLUMN     "cell3" INTEGER,
ADD COLUMN     "cell4" INTEGER,
ADD COLUMN     "cell5" INTEGER,
ADD COLUMN     "cell6" INTEGER,
ADD COLUMN     "cell7" INTEGER,
ADD COLUMN     "cell8" INTEGER,
ADD COLUMN     "cell9" INTEGER,
ADD COLUMN     "cellMax" INTEGER,
ADD COLUMN     "cellMin" INTEGER,
ADD COLUMN     "cmos_state" INTEGER,
ADD COLUMN     "current" INTEGER,
ADD COLUMN     "dmos_state" INTEGER,
ADD COLUMN     "temp_bot" INTEGER,
ADD COLUMN     "temp_cmos" INTEGER,
ADD COLUMN     "temp_dmos" INTEGER,
ADD COLUMN     "temp_mid" INTEGER,
ADD COLUMN     "temp_top" INTEGER,
ADD COLUMN     "voltage" INTEGER;

-- DropTable
DROP TABLE "BmsLogger";

-- DropTable
DROP TABLE "NojsLogger";

-- DropTable
DROP TABLE "NojsUser";

-- CreateTable
CREATE TABLE "TvdLoggers" (
    "id" BIGSERIAL NOT NULL,
    "nojsId" INTEGER NOT NULL,
    "bspPower" INTEGER,
    "lvdVsat" INTEGER,
    "mcbVoltage" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TvdLoggers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PmsLoggers" (
    "id" BIGSERIAL NOT NULL,
    "ts" VARCHAR(255),
    "nojsId" INTEGER NOT NULL,
    "battVolt" DOUBLE PRECISION,
    "cpuTemp" DOUBLE PRECISION,
    "dockActive" VARCHAR(255),
    "load1" DOUBLE PRECISION,
    "load2" DOUBLE PRECISION,
    "load3" DOUBLE PRECISION,
    "pmsId" INTEGER,
    "pmsCellId" BIGINT,
    "energyId" BIGINT,
    "pvId" BIGINT,
    "tvdId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PmsLoggers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteInformation" (
    "id" SERIAL NOT NULL,
    "nojs" VARCHAR(255) NOT NULL,
    "siteId" VARCHAR(255) NOT NULL,
    "terminalId" VARCHAR(255) NOT NULL,
    "siteName" VARCHAR(255) NOT NULL,
    "ip" VARCHAR(255) NOT NULL,
    "ipMiniPc" VARCHAR(255) NOT NULL,
    "webapp" VARCHAR(255) NOT NULL,
    "ehubVersion" VARCHAR(255),
    "panel2Type" VARCHAR(255),
    "mpptType" VARCHAR(255),
    "talisVersion" BOOLEAN,
    "tvdSite" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteInfoDetail" (
    "id" SERIAL NOT NULL,
    "nojsId" INTEGER NOT NULL,
    "cellularOperation" VARCHAR(255),
    "lc" VARCHAR(255),
    "gs" VARCHAR(255),
    "projectPhase" VARCHAR(255),
    "buildYear" VARCHAR(255),
    "onair" VARCHAR(255),
    "topoSustainDate" VARCHAR(255),
    "gsSustainDate" VARCHAR(255),
    "address" VARCHAR(255),
    "subdistrict" VARCHAR(255),
    "district" VARCHAR(255),
    "province" VARCHAR(255),
    "latitude" VARCHAR(255),
    "longitude" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteInfoDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BmsLoggers" (
    "id" BIGSERIAL NOT NULL,
    "ts" VARCHAR(255),
    "slaveId" INTEGER,
    "nojsId" INTEGER NOT NULL,
    "pcbCode" VARCHAR(255),
    "sn1Code" VARCHAR(255),
    "packVoltage" INTEGER,
    "packCurrent" INTEGER,
    "remainingCapacity" INTEGER,
    "averageCellTemperature" INTEGER,
    "environmentTemperature" INTEGER,
    "soc" INTEGER,
    "soh" INTEGER,
    "fullChargedCapacity" INTEGER,
    "cycleCount" INTEGER,
    "cellVoltageId" BIGINT,
    "maxCellVoltage" INTEGER,
    "minCellVoltage" INTEGER,
    "cellDifference" INTEGER,
    "maxCellTemperature" INTEGER,
    "minCellTemperature" INTEGER,
    "fetTemperature" INTEGER,
    "ambientTemperature" INTEGER,
    "remainingChargeTime" INTEGER,
    "remainingDischargeTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cellTemperature1" INTEGER,
    "cellTemperature2" INTEGER,
    "cellTemperature3" INTEGER,
    "warningFlag" VARCHAR[],
    "protectionFlag" VARCHAR[],
    "faultStatus" VARCHAR[],
    "errorMessages" VARCHAR[],

    CONSTRAINT "BmsLoggers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "nojsid_hash" ON "PmsLoggers" USING HASH ("nojsId");

-- CreateIndex
CREATE INDEX "ts_loggers_idx" ON "PmsLoggers"("ts");

-- CreateIndex
CREATE UNIQUE INDEX "UNIQUE_NOJS_NOJS" ON "SiteInformation"("nojs");

-- CreateIndex
CREATE UNIQUE INDEX "UNIQUE_NOJS_SITEID" ON "SiteInformation"("siteId");

-- AddForeignKey
ALTER TABLE "TvdLoggers" ADD CONSTRAINT "TvdLoggers_nojsId_fkey" FOREIGN KEY ("nojsId") REFERENCES "SiteInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PmsLoggers" ADD CONSTRAINT "PmsLoggers_pmsCellId_fkey" FOREIGN KEY ("pmsCellId") REFERENCES "PmsCell"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PmsLoggers" ADD CONSTRAINT "PmsLoggers_energyId_fkey" FOREIGN KEY ("energyId") REFERENCES "Energy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PmsLoggers" ADD CONSTRAINT "PmsLoggers_nojsId_fkey" FOREIGN KEY ("nojsId") REFERENCES "SiteInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PmsLoggers" ADD CONSTRAINT "PmsLoggers_pvId_fkey" FOREIGN KEY ("pvId") REFERENCES "Pv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteInfoDetail" ADD CONSTRAINT "SiteInfoDetail_nojsId_fkey" FOREIGN KEY ("nojsId") REFERENCES "SiteInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BmsLoggers" ADD CONSTRAINT "BmsLoggers_cellVoltageId_fkey" FOREIGN KEY ("cellVoltageId") REFERENCES "BmsCellVoltage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
