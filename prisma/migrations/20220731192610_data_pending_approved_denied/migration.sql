/*
  Warnings:

  - You are about to drop the column `isApproved` on the `PlaygroundRequest` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `PlaygroundApplication` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Accepted', 'Rejected');

-- AlterTable
ALTER TABLE "PlaygroundApplication" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PlaygroundRequest" DROP COLUMN "isApproved",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Pending';
