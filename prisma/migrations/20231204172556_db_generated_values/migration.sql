/*
  Warnings:

  - The values [User] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('Applicant', 'Organization', 'Admin');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN GENERATED ALWAYS AS (
CASE
  WHEN role = 'Admin' THEN true
  ELSE false
END
) STORED,
ADD COLUMN     "isApplicant" BOOLEAN GENERATED ALWAYS AS (
CASE
  WHEN role = 'Applicant' THEN true
  WHEN role = 'Admin' THEN true
  ELSE false
END
) STORED,
ADD COLUMN     "isOrganization" BOOLEAN GENERATED ALWAYS AS (
  CASE
  WHEN role = 'Admin' THEN true
  ELSE false
END
) STORED,
ALTER COLUMN "role" DROP DEFAULT;
