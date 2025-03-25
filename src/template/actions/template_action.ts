"use server";

import db from "@/lib/db";
import { templateSchema } from "@/validation/template_schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createTemplate = async (data: z.infer<typeof templateSchema>) => {
  try {
    await db.template.create({
      data: {
        ...data,
      },
    });
    revalidatePath("/templates");
  } catch (e) {
    console.error(e);
  }
};

export const updateTemplate = async (data: z.infer<typeof templateSchema>) => {
  try {
    await db.template.update({
      where: { id: data.name },
      data: {
        ...data,
      },
    });
    revalidatePath("/templates");
  } catch (e) {
    console.error(e);
  }
};

export const removeTemplate = async (id: string) => {
  try {
    await db.template.delete({
      where: { id },
    });
    revalidatePath("/templates");
  } catch (e) {
    console.error(e);
  }
};
