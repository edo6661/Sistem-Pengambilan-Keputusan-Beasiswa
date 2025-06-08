"use server";

import db from "@/lib/db";
import { BaseResult } from "@/types/base_result";
import { calculateVerifikasi } from "@/utils/calculateVerifikasi";
import { beasiswaSchema } from "@/validation/beasiswa_schema";
import { Verifikasi } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
export const upsertBeasiswa = async (
  data: z.infer<typeof beasiswaSchema>,
  { isEdit = false },
  userId: string
): Promise<BaseResult> => {
  try {
    if (!isEdit) {
      const isUserAlreadyHasBeasiswa = await db.beasiswa.findUnique({
        where: {
          userId,
        },
      });
      if (isUserAlreadyHasBeasiswa) {
        return {
          message: "User already has beasiswa",
          isSuccess: false,
        };
      }
    }

    await db.beasiswa.upsert({
      where: { userId },
      create: {
        ...data,
        verifikasi: calculateVerifikasi(
          data.ipk,
          data.prestasi,
          data.penghasilanOrangTua
        ),
        userId,
      },
      update: {
        ...data,
      },
    });

    revalidatePath("/");

    return {
      message: isEdit ? "Beasiswa updated" : "Beasiswa created",
      isSuccess: true,
    };
  } catch (e) {
    console.error(e);
    return {
      message: "Something went wrong",
      isSuccess: false,
    };
  }
};

export const updateVerifikasi = async (
  id: string,
  verifikasi: Verifikasi
): Promise<BaseResult> => {
  try {
    await db.beasiswa.update({
      where: { id },
      data: {
        verifikasi,
      },
    });
    revalidatePath("/beasiswas");
    return {
      message: "Verifikasi updated",
      isSuccess: true,
    };
  } catch (e) {
    console.error(e);
    return {
      message: "Something went wrong",
      isSuccess: false,
    };
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
