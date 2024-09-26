-- DropIndex
DROP INDEX "ts_loggers_idx";

-- CreateIndex
CREATE INDEX "nojsid_bmsLoggers" ON "BmsLoggers" USING HASH ("nojsSite");

-- CreateIndex
CREATE INDEX "ts_bmsLoggers" ON "BmsLoggers" USING HASH ("ts");

-- CreateIndex
CREATE INDEX "nojsid_pmsCell" ON "PmsCell" USING HASH ("nojsSite");

-- CreateIndex
CREATE INDEX "ts_pmsCell" ON "PmsCell" USING HASH ("ts");

-- CreateIndex
CREATE INDEX "ts_pmsLoggers" ON "PmsLoggers" USING HASH ("ts");

-- CreateIndex
CREATE INDEX "nojsid_tvd" ON "TvdLoggers" USING HASH ("nojsSite");

-- RenameIndex
ALTER INDEX "nojsid_hash" RENAME TO "nojsid_pmsLoggers";
