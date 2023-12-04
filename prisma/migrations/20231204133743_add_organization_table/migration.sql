/*
  Warnings:

  - You are about to drop the column `website` on the `RequestorInformation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RequestorInformation" DROP COLUMN "website";

-- CreateTable
CREATE TABLE "Organization" (
    "id" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "website" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");
