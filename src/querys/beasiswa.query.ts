import db from "@/lib/db";

export const getBeasiswaByUserId = async (userId: string) => {
  try {
    return await db.beasiswa.findFirst({
      where: {
        userId,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const getBeasiswas = async () => {
  try {
    return await db.beasiswa.findMany({
      include: {
        user: {
          select: {
            namaLengkap: true,
            id: true,
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
  }
};
