/*
  Warnings:

  - The values [BELUM,SUDAH] on the enum `Verifikasi` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TABLE "Beasiswa" ALTER COLUMN "verifikasi" DROP DEFAULT;
ALTER TYPE "Verifikasi" ADD VALUE 'DIPROSES';
ALTER TYPE "Verifikasi" ADD VALUE 'GAGAL';
ALTER TYPE "Verifikasi" ADD VALUE 'BERHASIL';
ALTER TYPE "Verifikasi"DROP VALUE 'BELUM';
ALTER TYPE "Verifikasi"DROP VALUE 'SUDAH';

-- AlterTable
ALTER TABLE "Beasiswa" ALTER COLUMN "verifikasi" SET DEFAULT 'DIPROSES';
