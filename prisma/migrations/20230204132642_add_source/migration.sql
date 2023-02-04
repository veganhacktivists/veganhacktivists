/*
  Warnings:

  - The `source` column on the `PlaygroundApplication` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PlaygroundApplication" DROP COLUMN "source",
ADD COLUMN     "source" "Source";
