"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useState, useTransition } from "react"
import { Beasiswa, Jurusan, Verifikasi } from "@prisma/client"
import { beasiswaSchema } from "@/validation/beasiswa_schema"
import { upsertBeasiswa } from "@/actions/beasiswa.action"
import InputFieldForm from "@/components/shared/InputFieldForm"
import ImagesInputs from "./ImagesInputs"
import SelectFieldForm from "@/components/shared/SelectFieldForm"
import { toastSonner } from "@/components/utils/toast_sonner"
import { motion } from "framer-motion"

interface FormBeasiswaProps {
  userId: string
  beasiswa?: Beasiswa
  onSuccess?: () => void
}

export function FormBeasiswa({ userId, beasiswa, onSuccess }: FormBeasiswaProps) {
  const [isPending, startTransition] = useTransition()
  const [screen, setScreen] = useState(1)
  const form = useForm<z.infer<typeof beasiswaSchema>>({
    resolver: zodResolver(beasiswaSchema),
    defaultValues: {
      nim: beasiswa?.nim || "",
      ipk: beasiswa?.ipk || 0,
      semester: beasiswa?.semester || 0,
      prestasi: beasiswa?.prestasi || 0,
      jurusan: beasiswa?.jurusan || Jurusan.TEKNIK_INFORMATIKA,
      verifikasi: beasiswa?.verifikasi || Verifikasi.DIPROSES,
      penghasilanOrangTua: beasiswa?.penghasilanOrangTua || 0,
      prestasiImages: beasiswa?.prestasiImages || [],
      transkripImage: beasiswa?.transkripImage || ""
    },
    mode: "onBlur"
  })

  async function onSubmit(data: z.infer<typeof beasiswaSchema>) {
    startTransition(async () => {
      const res = await upsertBeasiswa(data, {
        isEdit: !!beasiswa
      }, userId)
      toastSonner({
        message: res.message,
        isSuccess: res.isSuccess,
      })
      if (res.isSuccess && onSuccess) {
        onSuccess()
      }
    })
  }

  const incrementScreen = () => {
    setScreen(prevScreen => Math.min(prevScreen + 1, 2))
  }

  const decrementScreen = () => {
    setScreen(prevScreen => Math.max(prevScreen - 1, 1))
  }

  const { setValue, watch, formState: { isDirty, isValid } } = form


  const containerVariants = {
    initial: { x: 0 },
    animate: { x: -100 * (screen - 1) + "%" },
    transition: { type: "tween", duration: 0.5 }
  }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-xl mx-auto overflow-hidden"
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={containerVariants}
          transition={containerVariants.transition}
          className="flex gap-4"
        >
          <div className="w-full shrink-0 flex flex-col gap-8">
            <div className="space-y-6 flex-1">
              <InputFieldForm
                form={form}
                name="nim"
                label="NIM"
                placeholder="Masukkan NIM Anda"
              />
              <InputFieldForm
                form={form}
                name="ipk"
                label="IPK"
                placeholder="Masukkan IPK Anda"
                type="number"
              />
              <InputFieldForm
                form={form}
                name="semester"
                label="Semester"
                placeholder="Masukkan Semester Anda"
                type="number"
              />
              <InputFieldForm
                form={form}
                name="prestasi"
                label="Prestasi"
                placeholder="Masukkan Prestasi Anda"
                type="number"
              />
              <InputFieldForm
                form={form}
                name="penghasilanOrangTua"
                label="Penghasilan Orang Tua"
                placeholder="Masukkan Penghasilan Orang Tua"
              />
              <SelectFieldForm
                form={form}
                name="jurusan"
                label="Jurusan"
                options={[
                  {
                    label: "Teknik Informatika",
                    value: Jurusan.TEKNIK_INFORMATIKA
                  },
                  {
                    label: "Sistem Informasi",
                    value: Jurusan.SISTEM_INFORMASI
                  },
                  {
                    label: "Manajemen",
                    value: Jurusan.MANAJEMEN
                  },
                  {
                    label: "Business",
                    value: Jurusan.BUSINESS
                  }
                ]}
                placeholder="Pilih Jurusan Anda"
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={incrementScreen}
                className="w-full"
              >
                Lanjutkan
              </Button>
            </div>
          </div>

          <div className="w-full shrink-0 space-y-6 flex flex-col gap-8">
            <div className="flex-1">
              <ImagesInputs
                watch={watch}
                setValue={setValue}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Button
                type="button"
                onClick={decrementScreen}
                variant="outline"
                className="w-full"
              >
                Kembali
              </Button>
              <Button
                type="submit"
                disabled={
                  isPending ||
                  !isValid ||
                  (!!beasiswa && !isDirty)
                }
                className="w-full"
              >
                {beasiswa ? "Perbarui" : "Kirim"}
              </Button>
            </div>
          </div>
        </motion.div>
      </form>
    </Form>
  )
}