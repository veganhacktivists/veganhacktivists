/*
  Warnings:

  - Changed the type of `priority` on the `PlaygroundRequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PlaygroundRequest" DROP COLUMN "priority",
ADD COLUMN     "priority" SMALLINT NOT NULL;

-- DropEnum
DROP TYPE "Priority";
