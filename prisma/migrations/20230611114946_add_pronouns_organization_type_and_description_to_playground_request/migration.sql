-- CreateEnum
CREATE TYPE "PlaygroundRequestOrganizationType" AS ENUM ('Activism', 'Profit');

-- AlterTable
ALTER TABLE "PlaygroundRequest" ADD COLUMN     "organizationDescription" TEXT,
ADD COLUMN     "organizationType" "PlaygroundRequestOrganizationType",
ADD COLUMN     "pronouns" TEXT;

-- AlterTable
ALTER TABLE "PlaygroundRequest" ALTER COLUMN "estimatedTimeDays" DROP NOT NULL;
