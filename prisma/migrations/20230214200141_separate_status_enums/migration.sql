-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('Pending', 'Accepted', 'Rejected', 'Completed');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('Pending', 'Accepted', 'Rejected', 'Blocked');

-- Update
UPDATE "PlaygroundApplication" SET "status"='Accepted' WHERE "status"='Completed';

-- AlterTable
ALTER TABLE "PlaygroundApplication" ALTER COLUMN "status" DROP DEFAULT, ALTER COLUMN "status" TYPE "ApplicationStatus" USING status::VARCHAR::"ApplicationStatus", ALTER COLUMN "status" SET DEFAULT 'Pending';

-- Update
UPDATE "PlaygroundRequest" SET "status"='Pending' WHERE "status"='Blocked';

-- AlterTable
ALTER TABLE "PlaygroundRequest" ALTER COLUMN "status" DROP DEFAULT, ALTER COLUMN "status" TYPE "RequestStatus" USING status::VARCHAR::"RequestStatus", ALTER COLUMN "status" SET DEFAULT 'Pending';

-- DropEnum
DROP TYPE "Status";
