-- CreateTable
CREATE TABLE "RequestorInformation" (
    "id" VARCHAR(30) NOT NULL,
    "userId" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "contactLink" TEXT NOT NULL,

    CONSTRAINT "RequestorInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicantInformation" (
    "id" VARCHAR(30) NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactLink" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "availableTimePerWeek" "TimePerWeek" NOT NULL,
    "socialMedia" JSON NOT NULL,

    CONSTRAINT "ApplicantInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RequestorInformation_userId_key" ON "RequestorInformation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicantInformation_userId_key" ON "ApplicantInformation"("userId");

-- AddForeignKey
ALTER TABLE "RequestorInformation" ADD CONSTRAINT "RequestorInformation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicantInformation" ADD CONSTRAINT "ApplicantInformation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
