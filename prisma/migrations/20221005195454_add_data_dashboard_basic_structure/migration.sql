-- CreateEnum
CREATE TYPE "DashboardValueType" AS ENUM ('clicks', 'comments');

-- CreateTable
CREATE TABLE "DataDashboardData" (
    "id" VARCHAR(30) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT,
    "subcategory" TEXT,
    "graphId" TEXT NOT NULL,
    "dataDashboardValueId" VARCHAR(30),
    "dataDashboardGraphId" VARCHAR(30) NOT NULL,

    CONSTRAINT "DataDashboardData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataDashboardValue" (
    "id" VARCHAR(30) NOT NULL,
    "key" "DashboardValueType" NOT NULL,
    "value" TEXT,

    CONSTRAINT "DataDashboardValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataDashboardGraph" (
    "id" VARCHAR(30) NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "DataDashboardGraph_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DataDashboardData" ADD CONSTRAINT "DataDashboardData_dataDashboardValueId_fkey" FOREIGN KEY ("dataDashboardValueId") REFERENCES "DataDashboardValue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataDashboardData" ADD CONSTRAINT "DataDashboardData_dataDashboardGraphId_fkey" FOREIGN KEY ("dataDashboardGraphId") REFERENCES "DataDashboardGraph"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
