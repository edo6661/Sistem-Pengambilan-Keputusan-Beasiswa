/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Beasiswa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jurusan` to the `Beasiswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penghasilanOrangTua` to the `Beasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Jurusan" AS ENUM ('TEKNIK_INFORMATIKA', 'SISTEM_INFORMASI', 'MANAJEMEN', 'BUSINESS');

-- AlterTable
ALTER TABLE "Beasiswa" ADD COLUMN     "jurusan" "Jurusan" NOT NULL;
ALTER TABLE "Beasiswa" ADD COLUMN     "penghasilanOrangTua" INT4 NOT NULL;
ALTER TABLE "Beasiswa" ALTER COLUMN "nim" SET DATA TYPE STRING;
ALTER TABLE "Beasiswa" ALTER COLUMN "verifikasi" SET DEFAULT 'BELUM';

-- CreateIndex
CREATE UNIQUE INDEX "Beasiswa_userId_key" ON "Beasiswa"("userId");

-- AddForeignKey
ALTER TABLE "Beasiswa" ADD CONSTRAINT "Beasiswa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
