/*
  Warnings:

  - Added the required column `availableTimePerWeek` to the `PlaygroundApplication` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TimePerWeek" AS ENUM ('OneToThree', 'ThreeToFive', 'FiveToEight', 'TenPlus');

-- AlterTable
ALTER TABLE "PlaygroundApplication" ADD COLUMN     "availableTimePerWeek" "TimePerWeek" NOT NULL;
