UPDATE "PlaygroundApplication" SET "moreInfo" = '' WHERE "moreInfo" IS NULL;

-- AlterTable
ALTER TABLE "PlaygroundApplication" ALTER COLUMN "moreInfo" SET NOT NULL;
