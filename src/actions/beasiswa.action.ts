"use server";

import db from "@/lib/db";
import { beasiswaSchema } from "@/validation/beasiswa_schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createBeasiswa = async (data: z.infer<typeof beasiswaSchema>) => {
  try {
    await db.beasiswa.create({
      data: {
        ...data,
        userId: "1",
      },
    });
    revalidatePath("/beasiswas");
  } catch (e) {
    console.error(e);
  }
};

export const updateBeasiswa = async (data: z.infer<typeof beasiswaSchema>) => {
  try {
    await db.beasiswa.update({
      where: { id: data.id },
      data: {
        ...data,
      },
    });
    revalidatePath("/beasiswas");
  } catch (e) {
    console.error(e);
  }
};

export const removeBeasiswa = async (id: string) => {
  try {
    await db.beasiswa.delete({
      where: { id },
    });
    revalidatePath("/beasiswas");
  } catch (e) {
    console.error(e);
  }
};
