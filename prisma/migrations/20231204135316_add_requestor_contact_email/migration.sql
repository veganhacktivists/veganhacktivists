/*
  Warnings:

  - Added the required column `contactEmail` to the `RequestorInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RequestorInformation" ADD COLUMN     "contactEmail" TEXT NOT NULL;
