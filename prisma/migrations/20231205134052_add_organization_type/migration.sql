/*
  Warnings:

  - Added the required column `type` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- Add cuid function
CREATE OR REPLACE FUNCTION generate_cuid()
RETURNS text AS $$
DECLARE
    counter int := 0;
    timestamp text;
    randomString text;
    hostIdentifier text;
    counterString text;
    cuid text;
BEGIN
    timestamp := EXTRACT(EPOCH FROM NOW())::bigint::text;
    randomString := SUBSTRING(MD5(RANDOM()::text) FROM 1 FOR 4);
    hostIdentifier := SUBSTRING(MD5('vh.org') FROM 1 FOR 4);
    counter := counter + 1;
    counterString := LPAD(counter::text, 4, '0');
    cuid := 'c' || timestamp || hostIdentifier || counterString || randomString;
    RETURN cuid;
END;
$$ LANGUAGE plpgsql VOLATILE;

-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('Activism', 'Profit');

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "type" "OrganizationType" NOT NULL;

ALTER TABLE "Organization" ADD COLUMN "initialUser" TEXT;

INSERT INTO "Organization" ("id", "name", "description", "website", "type", "initialUser") select generate_cuid(), "organization", "organizationDescription", "website", "organizationType"::text::"OrganizationType", "requesterId" FROM "PlaygroundRequest" inner join "User" on "User".id = "PlaygroundRequest"."requesterId";

UPDATE "User" set "organizationId" = "Organization"."id" from "Organization" where "User".id = "Organization"."initialUser";
UPDATE "User" set "role" = 'Requestor' where "organizationId" is not null;
ALTER TABLE "Organization" DROP COLUMN "initialUser";

