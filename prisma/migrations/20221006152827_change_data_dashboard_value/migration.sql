-- DropForeignKey
ALTER TABLE "DataDashboardData" DROP CONSTRAINT "DataDashboardData_dataDashboardValueId_fkey";

-- AlterTable
ALTER TABLE "DataDashboardValue" ADD COLUMN     "dataDashboardDataId" VARCHAR(30);

-- AddForeignKey
ALTER TABLE "DataDashboardValue" ADD CONSTRAINT "DataDashboardValue_dataDashboardDataId_fkey" FOREIGN KEY ("dataDashboardDataId") REFERENCES "DataDashboardData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
