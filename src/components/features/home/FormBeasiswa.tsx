"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import { useTransition } from "react"
import { Beasiswa, Jurusan, Verifikasi } from "@prisma/client"
import { beasiswaSchema } from "@/validation/beasiswa_schema"
import { upsertBeasiswa } from "@/actions/beasiswa.action"
import InputFieldForm from "@/components/shared/InputFieldForm"
import ImagesInputs from "./ImagesInputs"
import SelectFieldForm from "@/components/shared/SelectFieldForm"
import { toastSonner } from "@/components/utils/toast_sonner"

interface FormBeasiswaProps {
  userId: string
  beasiswa?: Beasiswa
}

export function FormBeasiswa(
  { userId, beasiswa }: FormBeasiswaProps
) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof beasiswaSchema>>({
    resolver: zodResolver(beasiswaSchema),
    defaultValues: {
      nim: beasiswa?.nim || "",
      ipk: beasiswa?.ipk || 0,
      prestasi: beasiswa?.prestasi || 0,
      jurusan: beasiswa?.jurusan || Jurusan.TEKNIK_INFORMATIKA,
      verifikasi: beasiswa?.verifikasi || Verifikasi.DIPROSES,
      penghasilanOrangTua: beasiswa?.penghasilanOrangTua || 0,
      prestasiImages: beasiswa?.prestasiImages || [],
      transkripImage: beasiswa?.transkripImage || ""
    },
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
    })
  }

  const { setValue, watch } = form

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
        <InputFieldForm
          form={form}
          name="nim"
          label="NIM"
          placeholder="Enter your NIM"
        />
        <InputFieldForm
          form={form}
          name="ipk"
          label="IPK"
          placeholder="Enter your IPK"
          type="number"
        />
        <InputFieldForm
          form={form}
          name="prestasi"
          label="Prestasi"
          placeholder="Enter your Prestasi"
          type="number"
        />
        <InputFieldForm
          form={form}
          name="penghasilanOrangTua"
          label="Penghasilan Orang Tua"
          placeholder="Enter your Parent's Income"
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
          placeholder="Select your Jurusan"
        />
        <ImagesInputs
          watch={watch}
          setValue={setValue}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="w-full"
        >
          {beasiswa ? "Update" : "Submit"}
        </Button>
      </form>
    </Form>
  )
}