UPDATE "PlaygroundApplication" SET "portfolioLink" = '' WHERE "portfolioLink" IS NULL;

-- AlterTable
ALTER TABLE "PlaygroundApplication" ALTER COLUMN "portfolioLink" SET NOT NULL;
