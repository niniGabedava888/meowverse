/*
  Warnings:

  - Added the required column `name` to the `Cat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Cat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Cat" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "breed" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "sex" "Sex",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
