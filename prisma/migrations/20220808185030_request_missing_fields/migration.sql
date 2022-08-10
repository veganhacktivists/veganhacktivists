/*
  Warnings:

  - Added the required column `name` to the `PlaygroundRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providedEmail` to the `PlaygroundRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlaygroundRequest" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "providedEmail" TEXT NOT NULL;
