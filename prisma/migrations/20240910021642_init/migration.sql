/*
  Warnings:

  - You are about to drop the `Capacity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Capacity" DROP CONSTRAINT "Capacity_nojsId_fkey";

-- DropTable
DROP TABLE "Capacity";
