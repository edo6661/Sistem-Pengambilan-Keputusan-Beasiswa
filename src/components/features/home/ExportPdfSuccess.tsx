"use client"

import { Button } from "@/components/ui/button"
import { exportToPDFSingle } from "@/utils/exportToPdf"

export const ExportPdfSuccess = (
  { beasiswa }: { beasiswa: any }
) => {
  console.log("beasiswa:", beasiswa)

  return (
    <Button className='w-full max-w-xl' onClick={() => {
      exportToPDFSingle(beasiswa)
    }}>
      Download Bukti
    </Button>
  )
}