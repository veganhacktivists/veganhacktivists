/*
  Warnings:

  - Made the column `calendlyUrl` on table `PlaygroundRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PlaygroundRequest" ALTER COLUMN "calendlyUrl" SET NOT NULL;
