"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import { useState, useTransition } from "react"
import { registerSchema } from "@/validation/auth_schema"
import { register } from "@/actions/auth_action"
import InputFieldForm from "@/components/shared/InputFieldForm"
import { toastSonner } from "@/components/utils/toast_sonner"
import { useRouter } from "next/navigation"


export default function RegisterForm() {
  const [isPending, startTransition] = useTransition()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const router = useRouter();

  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      namaLengkap: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    startTransition(async () => {
      const res = await register(data)
      toastSonner(
        {
          message: res.message,
          isSuccess: res.isSuccess,
        }
      )
      if (res.isSuccess) {
        router.replace('/auth/login');
        router.refresh();

      }


    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md container space-y-4">
        <InputFieldForm
          form={form}
          name="namaLengkap"
          label="Nama Lengkap"
          placeholder="Enter your full name"
        />
        <InputFieldForm
          form={form}
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
        <InputFieldForm
          form={form}
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          isShowPassword={isShowPassword}
          toggleIsShowPassword={() => setIsShowPassword(!isShowPassword)}
        />
        <InputFieldForm
          form={form}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Enter your password"
          type="password"
          isShowPassword={isShowConfirmPassword}
          toggleIsShowPassword={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
        />


        <Button type="submit"
          disabled={isPending}
        >Submit</Button>
      </form>
    </Form>
  )
}
