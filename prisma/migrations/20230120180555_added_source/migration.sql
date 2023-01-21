-- CreateEnum
CREATE TYPE "Source" AS ENUM ('SearchEngine', 'Reddit', 'WebsiteOrBlog', 'SocialMediaPost', 'Email', 'Podcast', 'WordOfMouth', 'None');

-- AlterTable
ALTER TABLE "PlaygroundApplication" ADD COLUMN     "source" TEXT;
