/*
  Warnings:

  - You are about to drop the column `graphId` on the `DataDashboardData` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `DataDashboardData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataDashboardData" DROP COLUMN "graphId",
ADD COLUMN     "projectId" TEXT NOT NULL;
