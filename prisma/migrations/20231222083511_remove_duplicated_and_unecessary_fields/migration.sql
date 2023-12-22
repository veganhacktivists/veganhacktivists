/*
  Warnings:

  - You are about to drop the column `availableTimePerWeek` on the `PlaygroundApplication` table. All the data in the column will be lost.
  - You are about to drop the column `calendlyUrl` on the `PlaygroundApplication` table. All the data in the column will be lost.
  - You are about to drop the column `hasAppliedInThePast` on the `PlaygroundApplication` table. All the data in the column will be lost.
  - You are about to drop the column `instagramUrl` on the `PlaygroundApplication` table. All the data in the column will be lost.
  - You are about to drop the column `isVegan` on the `PlaygroundApplication` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinUrl` on the `PlaygroundApplication` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `PlaygroundApplication` table. All the data in the column will be lost.
  - You are about to drop the column `portfolioLink` on the `PlaygroundApplication` table. All the data in the column will be lost.
  - You are about to drop the column `pronouns` on the `PlaygroundApplication` table. All the data in the column will be lost.
  - You are about to drop the column `providedEmail` on the `PlaygroundApplication` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `PlaygroundApplication` table. All the data in the column will be lost.
  - You are about to drop the column `twitterUrl` on the `PlaygroundApplication` table. All the data in the column will be lost.
  - You are about to drop the column `calendlyUrl` on the `PlaygroundRequest` table. All the data in the column will be lost.
  - You are about to drop the column `devRequestWebsiteExists` on the `PlaygroundRequest` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedTimeDays` on the `PlaygroundRequest` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `PlaygroundRequest` table. All the data in the column will be lost.
  - You are about to drop the column `organization` on the `PlaygroundRequest` table. All the data in the column will be lost.
  - You are about to drop the column `organizationDescription` on the `PlaygroundRequest` table. All the data in the column will be lost.
  - You are about to drop the column `organizationType` on the `PlaygroundRequest` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `PlaygroundRequest` table. All the data in the column will be lost.
  - You are about to drop the column `pronouns` on the `PlaygroundRequest` table. All the data in the column will be lost.
  - You are about to drop the column `providedEmail` on the `PlaygroundRequest` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `PlaygroundRequest` table. All the data in the column will be lost.
  - Added the required column `organizationId` to the `PlaygroundRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlaygroundRequest" DROP CONSTRAINT "PlaygroundRequest_requesterId_fkey";

-- AlterTable
ALTER TABLE "PlaygroundApplication" DROP COLUMN "availableTimePerWeek",
DROP COLUMN "calendlyUrl",
DROP COLUMN "hasAppliedInThePast",
DROP COLUMN "instagramUrl",
DROP COLUMN "isVegan",
DROP COLUMN "linkedinUrl",
DROP COLUMN "name",
DROP COLUMN "portfolioLink",
DROP COLUMN "pronouns",
DROP COLUMN "providedEmail",
DROP COLUMN "source",
DROP COLUMN "twitterUrl";

-- AlterTable
ALTER TABLE "PlaygroundRequest" DROP COLUMN "calendlyUrl",
DROP COLUMN "devRequestWebsiteExists",
DROP COLUMN "estimatedTimeDays",
DROP COLUMN "name",
DROP COLUMN "organization",
DROP COLUMN "organizationDescription",
DROP COLUMN "organizationType",
DROP COLUMN "phone",
DROP COLUMN "pronouns",
DROP COLUMN "providedEmail",
DROP COLUMN "website",
ADD COLUMN     "organizationId" TEXT;

-- AddForeignKey
ALTER TABLE "PlaygroundRequest" ADD CONSTRAINT "PlaygroundRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

UPDATE "PlaygroundRequest" SET "organizationId" = "User"."organizationId" FROM "User" WHERE "PlaygroundRequest"."requesterId" = "User"."id";
DELETE FROM "PlaygroundRequest" WHERE "organizationId" IS NULL;

ALTER TABLE "PlaygroundRequest" ALTER COLUMN "organizationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PlaygroundRequest" ADD CONSTRAINT "PlaygroundRequest_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
