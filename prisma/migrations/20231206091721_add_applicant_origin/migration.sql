/*
  Warnings:

  - Added the required column `origin` to the `ApplicantInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApplicantInformation" ADD COLUMN     "origin" TEXT NOT NULL;
