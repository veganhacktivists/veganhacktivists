/*
  Warnings:

  - The values [Translator] on the enum `PlaygroundRequestCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
UPDATE "PlaygroundRequest" SET category = 'Other' WHERE category = 'Translator';
CREATE TYPE "PlaygroundRequestCategory_new" AS ENUM ('Developer', 'Designer', 'Writer', 'Editor', 'Researcher', 'Marketer', 'Social', 'DataScientist', 'Security', 'Other');
ALTER TABLE "PlaygroundRequest" ALTER COLUMN "category" TYPE "PlaygroundRequestCategory_new" USING ("category"::text::"PlaygroundRequestCategory_new");
ALTER TYPE "PlaygroundRequestCategory" RENAME TO "PlaygroundRequestCategory_old";
ALTER TYPE "PlaygroundRequestCategory_new" RENAME TO "PlaygroundRequestCategory";
DROP TYPE "PlaygroundRequestCategory_old";
COMMIT;
