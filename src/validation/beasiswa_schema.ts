import * as z from "zod";

export const beasiswaSchema = z.object({
  id: z.string().optional(),
  nim: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  ipk: z.number().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  prestasi: z.number().nullable(),
  penghasilanOrangTua: z.string(),
  prestasiImages: z.array(z.string()),
  transkripImage: z.string(),
  jurusan: z.enum([
    "TEKNIK_INFORMATIKA",
    "SISTEM_INFORMASI",
    "MANAJEMEN",
    "BUSINESS",
  ]),
  verifikasi: z.enum(["BELUM", "SUDAH"]),
});
