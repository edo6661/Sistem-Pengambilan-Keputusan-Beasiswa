import { Beasiswa as BeasiswaType } from '@prisma/client'
import React from 'react'
const Beasiswa = (
  {
    ipk, jurusan, nim, penghasilanOrangTua, id, prestasi, prestasiImages, transkripImage, verifikasi
  }: BeasiswaType
) => {
  return (
    <div>Beasiswa</div>
  )
}

export default Beasiswa