/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - The primary key for the `Budget` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Budget` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - The primary key for the `PlaygroundApplication` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `PlaygroundApplication` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - The primary key for the `PlaygroundRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `PlaygroundRequest` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE "Account"
ALTER COLUMN "id" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "Budget"
ALTER COLUMN "id" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "PlaygroundApplication"
ALTER COLUMN "id" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "PlaygroundRequest"
ALTER COLUMN "id" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "Session"
ALTER COLUMN "id" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "User"
ALTER COLUMN "id" SET DATA TYPE VARCHAR(30);
