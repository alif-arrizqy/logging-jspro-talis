/*
  Warnings:

  - You are about to drop the column `errorMessage` on the `BmsLogger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BmsLogger" DROP COLUMN "errorMessage",
ADD COLUMN     "errorMessages" VARCHAR(255);
