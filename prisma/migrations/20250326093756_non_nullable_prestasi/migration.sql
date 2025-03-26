/*
  Warnings:

  - Made the column `prestasi` on table `Beasiswa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Beasiswa" ALTER COLUMN "prestasi" SET NOT NULL;
