/*
  Warnings:

  - Changed the type of `category` on the `PlaygroundRequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PlaygroundRequestCategory" AS ENUM ('Design', 'Website', 'Marketing', 'VideoProduction', 'SocialMedia');

-- AlterTable
ALTER TABLE "PlaygroundRequest" DROP COLUMN "category",
ADD COLUMN     "category" "PlaygroundRequestCategory" NOT NULL;
