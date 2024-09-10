/*
  Warnings:

  - The `warningFlag` column on the `BmsLogger` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `protectionFlag` column on the `BmsLogger` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `faultStatus` column on the `BmsLogger` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `errorMessages` column on the `BmsLogger` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "BmsLogger" DROP COLUMN "warningFlag",
ADD COLUMN     "warningFlag" VARCHAR(255)[],
DROP COLUMN "protectionFlag",
ADD COLUMN     "protectionFlag" VARCHAR(255)[],
DROP COLUMN "faultStatus",
ADD COLUMN     "faultStatus" VARCHAR(255)[],
DROP COLUMN "errorMessages",
ADD COLUMN     "errorMessages" VARCHAR(255)[];
