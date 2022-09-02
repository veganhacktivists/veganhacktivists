/*
  Warnings:

  - You are about to alter the column `title` on the `PlaygroundRequest` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "PlaygroundRequest" ALTER COLUMN "title" SET DATA TYPE VARCHAR(200);
