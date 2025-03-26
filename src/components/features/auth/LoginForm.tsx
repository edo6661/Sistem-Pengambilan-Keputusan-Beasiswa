"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import { useState, useTransition } from "react"
import { loginSchema } from "@/validation/auth_schema"
import { login } from "@/actions/auth_action"
import { toastSonner } from "@/components/utils/toast_sonner"
import { useRouter } from "next/navigation"
import InputFieldForm from "@/components/shared/InputFieldForm"


export default function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false)


  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      const res = await login(data)
      toastSonner(
        {
          message: res.message,
          isSuccess: res.isSuccess,
        }
      )
      if (res.isSuccess) {
        router.replace('/');
        router.refresh();

      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md container space-y-4">
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
        <Button type="submit"
          disabled={isPending}
        >Submit</Button>
      </form>
    </Form>
  )
}
