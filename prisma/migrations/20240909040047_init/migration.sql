-- CreateTable
CREATE TABLE "Capacity" (
    "id" SERIAL NOT NULL,
    "nojsId" INTEGER NOT NULL,
    "diskFree" VARCHAR(8),
    "diskTotal" VARCHAR(8),
    "diskUsed" VARCHAR(8),
    "freeRam" VARCHAR(8),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Capacity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DockCell" (
    "id" BIGSERIAL NOT NULL,
    "dockMax" INTEGER,
    "valueMax" DOUBLE PRECISION,
    "dockMin" INTEGER,
    "valueMin" DOUBLE PRECISION,
    "valueDiff" DOUBLE PRECISION,
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
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "DockCell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Energy" (
    "id" BIGSERIAL NOT NULL,
    "edl1" DOUBLE PRECISION,
    "edl2" DOUBLE PRECISION,
    "eh1" DOUBLE PRECISION,
    "eh2" DOUBLE PRECISION,
    "eh3" DOUBLE PRECISION,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "edl3" DOUBLE PRECISION,

    CONSTRAINT "Energy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NojsLogger" (
    "id" BIGSERIAL NOT NULL,
    "ts" VARCHAR(255),
    "nojsId" INTEGER NOT NULL,
    "battVolt" DOUBLE PRECISION,
    "cpuTemp" DOUBLE PRECISION,
    "dockActive" VARCHAR(255),
    "load1" DOUBLE PRECISION,
    "load2" DOUBLE PRECISION,
    "load3" DOUBLE PRECISION,
    "dockCellId" BIGINT,
    "energyId" BIGINT,
    "pvId" BIGINT,
    "bspwatt" INTEGER,
    "mcbVoltage" DOUBLE PRECISION,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "NojsLogger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NojsUser" (
    "id" SERIAL NOT NULL,
    "nojs" VARCHAR(255) NOT NULL,
    "site" VARCHAR(255) NOT NULL,
    "ip" VARCHAR(255) NOT NULL,
    "lc" VARCHAR(255),
    "gs" INTEGER,
    "mitra" VARCHAR(255),
    "kota" VARCHAR(255),
    "provinsi" VARCHAR(255),
    "latitude" VARCHAR(255),
    "longitude" VARCHAR(255),
    "ehubVersion" VARCHAR(255),
    "panel2Type" VARCHAR(255),
    "mpptType" VARCHAR(255),
    "talisVersion" BOOLEAN,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "NojsUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pv" (
    "id" BIGSERIAL NOT NULL,
    "pv1Curr" DOUBLE PRECISION,
    "pv1Volt" DOUBLE PRECISION,
    "pv2Curr" DOUBLE PRECISION,
    "pv2Volt" DOUBLE PRECISION,
    "pv3Curr" DOUBLE PRECISION,
    "pv3Volt" DOUBLE PRECISION,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Pv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BmsLogger" (
    "id" BIGSERIAL NOT NULL,
    "ts" VARCHAR(255),
    "nojsId" INTEGER NOT NULL,
    "errorMessage" VARCHAR(255),
    "pcbCode" VARCHAR(255),
    "sn1Code" VARCHAR(255),
    "packVoltage" INTEGER,
    "packCurrent" INTEGER,
    "remainingCapacity" INTEGER,
    "averageCellTemperature" INTEGER,
    "environmentTemperature" INTEGER,
    "warningFlag" VARCHAR(255),
    "protectionFlag" VARCHAR(255),
    "faultStatus" VARCHAR(255),
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
    "cellTemperature" INTEGER,
    "ambientTemperature" INTEGER,
    "remainingChargeTime" INTEGER,
    "remainingDischargeTime" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "BmsLogger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BmsCellVoltage" (
    "id" BIGSERIAL NOT NULL,
    "cell1" INTEGER,
    "cell2" INTEGER,
    "cell3" INTEGER,
    "cell4" INTEGER,
    "cell5" INTEGER,
    "cell6" INTEGER,
    "cell7" INTEGER,
    "cell8" INTEGER,
    "cell9" INTEGER,
    "cell10" INTEGER,
    "cell11" INTEGER,
    "cell12" INTEGER,
    "cell13" INTEGER,
    "cell14" INTEGER,
    "cell15" INTEGER,
    "cell16" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "BmsCellVoltage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "nojsid_hash" ON "NojsLogger" USING HASH ("nojsId");

-- CreateIndex
CREATE INDEX "ts_loggers_idx" ON "NojsLogger"("ts");

-- CreateIndex
CREATE UNIQUE INDEX "UNIQUE_NOJS" ON "NojsUser"("nojs");

-- AddForeignKey
ALTER TABLE "Capacity" ADD CONSTRAINT "Capacity_nojsId_fkey" FOREIGN KEY ("nojsId") REFERENCES "NojsUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NojsLogger" ADD CONSTRAINT "NojsLogger_dockCellId_fkey" FOREIGN KEY ("dockCellId") REFERENCES "DockCell"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NojsLogger" ADD CONSTRAINT "NojsLogger_energyId_fkey" FOREIGN KEY ("energyId") REFERENCES "Energy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NojsLogger" ADD CONSTRAINT "NojsLogger_nojsId_fkey" FOREIGN KEY ("nojsId") REFERENCES "NojsUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NojsLogger" ADD CONSTRAINT "NojsLogger_pvId_fkey" FOREIGN KEY ("pvId") REFERENCES "Pv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BmsLogger" ADD CONSTRAINT "BmsLogger_cellVoltageId_fkey" FOREIGN KEY ("cellVoltageId") REFERENCES "BmsCellVoltage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
