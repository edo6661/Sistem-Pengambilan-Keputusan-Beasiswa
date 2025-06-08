import { Verifikasi } from "@prisma/client";

export const calculateVerifikasi = (
  ipk: number,
  prestasi: number,
  penghasilanOrangTua: number
): Verifikasi => {
  const maxIpk = 4.0;
  const minPenghasilan = 1_000_000;
  const maxPrestasi = 5;

  const bobotIpk = 0.3333;
  const bobotPenghasilan = 0.1666;
  const bobotPrestasi = 0.5;

  const nilaiIpk = ipk / maxIpk;
  const nilaiPenghasilan = minPenghasilan / penghasilanOrangTua;
  const nilaiPrestasi = prestasi / maxPrestasi;

  const skorTotal =
    nilaiIpk * bobotIpk +
    nilaiPenghasilan * bobotPenghasilan +
    nilaiPrestasi * bobotPrestasi;

  if (skorTotal >= 0.7) {
    return Verifikasi.BERHASIL;
  } else {
    return Verifikasi.GAGAL;
  }
};
