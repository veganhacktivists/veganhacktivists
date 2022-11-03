/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `DataDashboardProject` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DataDashboardProject_label_key" ON "DataDashboardProject"("label");
