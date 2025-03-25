"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useTransition } from "react"
import { Jurusan } from "@prisma/client"
import { createBeasiswa } from "@/actions/beasiswa.action"
import { beasiswaSchema } from "@/validation/beasiswa_schema"


export function FormBeasiswa() {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof beasiswaSchema>>({
    resolver: zodResolver(beasiswaSchema),
    defaultValues: {
      nim: "",
      ipk: 0,
      prestasi: 0,
      jurusan: Jurusan.TEKNIK_INFORMATIKA,
      verifikasi: "BELUM",
      penghasilanOrangTua: "",
      prestasiImages: [""],
      transkripImage: ""
    },
  })

  async function onSubmit(data: z.infer<typeof beasiswaSchema>) {
    startTransition(() => {
      createBeasiswa(data)
      toast("Beasiswa created.")
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="nim"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIM</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"
          disabled={isPending}
        >Submit</Button>
      </form>
    </Form>
  )
}
