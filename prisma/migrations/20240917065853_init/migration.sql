-- AddForeignKey
ALTER TABLE "BmsLoggers" ADD CONSTRAINT "BmsLoggers_nojsSite_fkey" FOREIGN KEY ("nojsSite") REFERENCES "SiteInformation"("nojs") ON DELETE CASCADE ON UPDATE CASCADE;
