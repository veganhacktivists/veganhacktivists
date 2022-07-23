-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('Low', 'Medium', 'High', 'Urgent');

-- CreateTable
CREATE TABLE "PlaygroundApplication" (
    "id" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "portfolioLink" TEXT,
    "twitterUrl" TEXT,
    "instagramUrl" TEXT,
    "linkedinUrl" TEXT,
    "hasAppliedInThePast" BOOLEAN NOT NULL,
    "isVegan" BOOLEAN NOT NULL,
    "calendlyUrl" TEXT,
    "moreInfo" TEXT,
    "requestId" TEXT,

    CONSTRAINT "PlaygroundApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaygroundRequest" (
    "id" TEXT NOT NULL,
    "phone" TEXT,
    "organization" TEXT,
    "website" TEXT NOT NULL,
    "calendlyUrl" TEXT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "priority" "Priority" NOT NULL,
    "roleTitle" TEXT NOT NULL,
    "requiredSkills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "free" BOOLEAN NOT NULL,
    "budget" MONEY NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" DATE NOT NULL,
    "estimatedTimeDays" INTEGER NOT NULL,
    "requesterId" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlaygroundRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlaygroundApplication" ADD CONSTRAINT "PlaygroundApplication_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaygroundApplication" ADD CONSTRAINT "PlaygroundApplication_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "PlaygroundRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaygroundRequest" ADD CONSTRAINT "PlaygroundRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
