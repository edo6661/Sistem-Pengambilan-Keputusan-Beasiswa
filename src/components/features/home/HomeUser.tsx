import { User, Verifikasi } from '@prisma/client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import { FormBeasiswa } from './FormBeasiswa'
import { getBeasiswaByUserId } from '@/querys/beasiswa.query'
import { ExportPdfSuccess } from './ExportPdfSuccess'

interface HomeUserProps {
  user: User;
}

const HomeUser = async ({ user }: HomeUserProps) => {
  const beasiswa = await getBeasiswaByUserId(user.id)


  const renderBeasiswaStatus = () => {
    if (!beasiswa) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Pengajuan Beasiswa</CardTitle>
          </CardHeader>
          <CardContent>
            <FormBeasiswa userId={user.id} />
          </CardContent>
        </Card>
      )
    }

    switch (beasiswa.verifikasi) {
      case Verifikasi.GAGAL:
        return (
          <Alert className='max-w-xl mx-auto' variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Pengajuan Gagal</AlertTitle>
            <AlertDescription>
              Maaf, pengajuan beasiswa Anda gagal.
            </AlertDescription>
          </Alert>
        )

      case Verifikasi.DIPROSES:
        return (
          <Alert className='max-w-xl mx-auto' variant="default">
            <Info className="h-4 w-4" />
            <AlertTitle>Sedang Diproses</AlertTitle>
            <AlertDescription>
              Pengajuan beasiswa Anda sedang dalam proses verifikasi. Mohon menunggu informasi selanjutnya.
            </AlertDescription>
          </Alert>
        )

      case Verifikasi.BERHASIL:
        return (
          <div className='flex flex-col gap-8 items-center'>
            <Alert className='max-w-xl mx-auto' variant="default">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Selamat!</AlertTitle>
              <AlertDescription>
                Pengajuan beasiswa Anda telah disetujui. Anda berhasil mendapatkan beasiswa.
              </AlertDescription>
            </Alert>
            <ExportPdfSuccess
              beasiswa={beasiswa}
            />
          </div>
        )

      default:
        return (
          <Alert className='max-w-xl mx-auto' variant="default">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Status Tidak Dikenali</AlertTitle>
            <AlertDescription>
              Terjadi kesalahan dalam memproses status beasiswa Anda.
            </AlertDescription>
          </Alert>
        )
    }
  }

  return (
    <div className="space-y-4">
      {renderBeasiswaStatus()}
      {/* <EditBeasiswa
        userId={user.id}
        beasiswa={beasiswa!}
      /> */}
    </div>
  )
}

export default HomeUser