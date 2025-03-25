-- CreateEnum
CREATE TYPE "Verifikasi" AS ENUM ('BELUM', 'SUDAH');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "namaLengkap" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "image" STRING,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beasiswa" (
    "id" STRING NOT NULL,
    "nim" INT4 NOT NULL,
    "ipk" FLOAT8 NOT NULL,
    "prestasi" INT4 NOT NULL,
    "verifikasi" "Verifikasi" NOT NULL,
    "prestasiImages" STRING[],
    "transkripImage" STRING NOT NULL,
    "userId" STRING NOT NULL,

    CONSTRAINT "Beasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
