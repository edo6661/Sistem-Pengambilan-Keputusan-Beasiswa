import RegisterForm from "@/components/features/auth/RegisterForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register page',
}

const RegisterPage = () => {
  return <RegisterForm />
}

export default RegisterPage