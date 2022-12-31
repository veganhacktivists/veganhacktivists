/*
  Warnings:

  - Made the column `phone` on table `PlaygroundRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PlaygroundRequest" ALTER COLUMN "phone" SET NOT NULL;
