import { User, Verifikasi } from '@prisma/client'
import React from 'react'
import { FormBeasiswa } from './FormBeasiswa';
import { getBeasiswaByUserId } from '@/querys/beasiswa.query';
import EditBeasiswa from './EditBeasiswa';
interface HomeUserProps {
  user: User;
}
const HomeUser = async (
  { user }: HomeUserProps
) => {
  const beasiswa = await getBeasiswaByUserId(user.id)

  return (
    <>
      {beasiswa == null && (
        <FormBeasiswa userId={user.id} />
      )}
      {beasiswa && (
        <>
          <div >
            {beasiswa?.verifikasi === Verifikasi.GAGAL && (
              <div>
                <h1>
                  Maaf anda gagal mendapatkan beasiswa
                </h1>
              </div>
            )}
            {beasiswa?.verifikasi === Verifikasi.DIPROSES && (
              <div>
                <h1>
                  Maaf anda sedang dalam proses verifikasi
                </h1>
              </div>
            )}
            {beasiswa?.verifikasi === Verifikasi.BERHASIL && (
              <div>
                <h1>
                  Maaf anda mendapatkan beasiswa
                </h1>
              </div>
            )}
            <EditBeasiswa
              userId={user.id}
              beasiswa={beasiswa}
            />
          </div>
        </>
      )}

    </>
  )

}

export default HomeUser