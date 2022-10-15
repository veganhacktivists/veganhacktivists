/*
  Warnings:

  - You are about to drop the column `dataDashboardGraphId` on the `DataDashboardData` table. All the data in the column will be lost.
  - You are about to drop the `DataDashboardGraph` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DataDashboardData" DROP CONSTRAINT "DataDashboardData_dataDashboardGraphId_fkey";

-- AlterTable
ALTER TABLE "DataDashboardData" DROP COLUMN "dataDashboardGraphId",
ADD COLUMN     "dataDashboardProjectId" VARCHAR(30);

-- DropTable
DROP TABLE "DataDashboardGraph";

-- CreateTable
CREATE TABLE "DataDashboardProject" (
    "id" VARCHAR(30) NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "DataDashboardProject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DataDashboardData" ADD CONSTRAINT "DataDashboardData_dataDashboardProjectId_fkey" FOREIGN KEY ("dataDashboardProjectId") REFERENCES "DataDashboardProject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
