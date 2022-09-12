-- CreateEnum
CREATE TYPE "BudgetType" AS ENUM ('Fixed', 'Hourly');

-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL,
    "quantity" MONEY NOT NULL,
    "type" "BudgetType" NOT NULL,
    "requestId" TEXT NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Budget_requestId_key" ON "Budget"("requestId");

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "PlaygroundRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Transform old data
-- The default cuid is handled by prisma, so we take the request id. I don't love it and it's making me want to just use incremental in ids
INSERT INTO "Budget" ("id", "requestId", "quantity", "type")
SELECT "id", "id", "budget", 'Fixed' FROM "PlaygroundRequest" WHERE NOT "isFree";

-- AlterTable
ALTER TABLE "PlaygroundRequest" DROP COLUMN "budget",
DROP COLUMN "isFree";
