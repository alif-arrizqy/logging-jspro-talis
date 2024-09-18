/*
  Warnings:

  - You are about to drop the column `cell15` on the `PmsCell` table. All the data in the column will be lost.
  - You are about to drop the column `cell16` on the `PmsCell` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PmsCell" DROP COLUMN "cell15",
DROP COLUMN "cell16";
