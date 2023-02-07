-- CreateEnum
CREATE TYPE "Source" AS ENUM ('SearchEngine', 'Reddit', 'SocialMediaPost', 'EmailPodcastAds', 'WordOfMouth', 'WebsiteOrBlog', 'None');

-- AlterTable
ALTER TABLE "PlaygroundApplication" ADD COLUMN     "source" "Source";
