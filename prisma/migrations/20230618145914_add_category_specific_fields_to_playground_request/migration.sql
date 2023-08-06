-- CreateEnum
CREATE TYPE "PlaygroundRequestDesignRequestType" AS ENUM ('Logo', 'SocialMedia', 'Branding', 'DonorDocuments', 'UserInterface', 'Illustration', 'Animation', 'Miscellaneous', 'Other');

-- AlterTable
ALTER TABLE "PlaygroundRequest" ADD COLUMN     "designRequestCurrentDesignExists" BOOLEAN,
ADD COLUMN     "designRequestType" "PlaygroundRequestDesignRequestType",
ADD COLUMN     "devRequestWebsiteExists" BOOLEAN,
ADD COLUMN     "devRequestWebsiteUrl" TEXT;
