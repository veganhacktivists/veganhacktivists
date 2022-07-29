/*
  Warnings:

  - A unique constraint covering the columns `[requestId,applicantId]` on the table `PlaygroundApplication` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providedEmail` to the `PlaygroundApplication` table without a default value. This is not possible if the table is not empty.
  - Made the column `requestId` on table `PlaygroundApplication` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PlaygroundApplication" DROP CONSTRAINT "PlaygroundApplication_requestId_fkey";

-- AlterTable
ALTER TABLE "PlaygroundApplication" ADD COLUMN     "providedEmail" TEXT NOT NULL,
ALTER COLUMN "requestId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PlaygroundApplication_requestId_applicantId_key" ON "PlaygroundApplication"("requestId", "applicantId");

-- AddForeignKey
ALTER TABLE "PlaygroundApplication" ADD CONSTRAINT "PlaygroundApplication_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "PlaygroundRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
