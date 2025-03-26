/*
  Warnings:

  - Changed the type of `penghasilanOrangTua` on the `Beasiswa` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Beasiswa" DROP COLUMN "penghasilanOrangTua";
ALTER TABLE "Beasiswa" ADD COLUMN     "penghasilanOrangTua" FLOAT8 NOT NULL;
