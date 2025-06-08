import { Verifikasi } from "@prisma/client";
import * as z from "zod";

export const beasiswaSchema = z.object({
  id: z.string().optional(),
  nim: z.string().min(2, {
    message: "NIM minimal 2 karakter",
  }),
  ipk: z.preprocess(
    (val) => Number(val),
    z
      .number({
        invalid_type_error: "IPK harus berupa angka",
        required_error: "IPK wajib diisi",
      })
      .min(0, { message: "IPK minimal 0" })
      .max(4, { message: "IPK maksimal 4" })
  ),
  semester: z.preprocess(
    (val) => Number(val),
    z
      .number({
        invalid_type_error: "Semester harus berupa angka",
        required_error: "Semester wajib diisi",
      })
      .min(0, { message: "Semester minimal 1" })
      .max(4, { message: "Semester maksimal 8" })
  ),
  penghasilanOrangTua: z.preprocess(
    (val) => Number(val),
    z
      .number({
        invalid_type_error: "Penghasilan orang tua harus berupa angka",
        required_error: "Penghasilan orang tua wajib diisi",
      })
      .min(1000000, { message: "Penghasilan orang tua tidak boleh negatif" })
  ),
  prestasi: z.preprocess(
    (val) => (val === "" ? null : Number(val)),
    z.number().min(0, { message: "Prestasi tidak boleh negatif" })
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
