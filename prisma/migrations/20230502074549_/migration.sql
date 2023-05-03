/*
  Warnings:

  - Made the column `updatedAt` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imagePath` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "imagePath" SET NOT NULL,
ALTER COLUMN "phoneNumber" SET NOT NULL;
