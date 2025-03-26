import { Verifikasi } from "@prisma/client";
import * as z from "zod";

export const beasiswaSchema = z.object({
  id: z.string().optional(),
  nim: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  ipk: z.preprocess(
    (val) => Number(val),
    z
      .number({
        invalid_type_error: "IPK must be a number",
        required_error: "IPK is required",
      })
      .min(0, { message: "IPK minimal 0" })
      .max(4, { message: "IPK maksimal 4" })
  ),
  penghasilanOrangTua: z.preprocess(
    (val) => Number(val),
    z
      .number({
        invalid_type_error: "Penghasilan orang tua harus berupa angka",
        required_error: "Penghasilan orang tua wajib diisi",
      })
      .min(0, { message: "Penghasilan orang tua tidak boleh negatif" })
  ),
  prestasi: z.preprocess(
    (val) => (val === "" ? null : Number(val)),
    z.number().nullable()
  ),
  prestasiImages: z.array(z.string()),
  transkripImage: z.string(),
  jurusan: z.enum([
    "TEKNIK_INFORMATIKA",
    "SISTEM_INFORMASI",
    "MANAJEMEN",
    "BUSINESS",
  ]),
  verifikasi: z.enum([
    Verifikasi.DIPROSES,
    Verifikasi.GAGAL,
    Verifikasi.BERHASIL,
  ]),
});
