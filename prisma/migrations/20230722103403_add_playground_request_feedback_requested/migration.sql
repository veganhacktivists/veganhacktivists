-- AlterTable
ALTER TABLE "PlaygroundApplication" ADD COLUMN     "acceptedAt" TIMESTAMP(3),
ADD COLUMN     "feedbackRequested" BOOLEAN DEFAULT false;

-- Copy updatedAt to acceptedAt
UPDATE "PlaygroundApplication" SET "acceptedAt" = "updatedAt";
