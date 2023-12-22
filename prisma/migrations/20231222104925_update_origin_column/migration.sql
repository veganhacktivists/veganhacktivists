/*
  Warnings:

  - Changed the type of `origin` on the `ApplicantInformation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Origin" AS ENUM ('SearchEngine', 'Reddit', 'SocialMediaPost', 'EmailPodcastAds', 'WordOfMouth', 'WebsiteOrBlog', 'None');

-- AlterTable
ALTER TABLE "ApplicantInformation" DROP COLUMN "origin",
ADD COLUMN     "origin" "Origin" NOT NULL;

-- DropEnum
DROP TYPE "Source";
