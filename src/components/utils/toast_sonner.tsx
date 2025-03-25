import { toast } from 'sonner'
interface ToastSonnerProps {
  message: string
  isSuccess: boolean
}
export const toastSonner = (
  { message, isSuccess }: ToastSonnerProps
) => {
  return isSuccess ? toast.success(message) : toast.error(message)
}