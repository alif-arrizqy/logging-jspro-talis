/*
  Warnings:

  - Added the required column `threadId` to the `BmsLogger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BmsLogger" ADD COLUMN     "threadId" INTEGER NOT NULL;
