
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
interface ModalProps {
  isOpen: boolean
  onChangeIsOpen: (isOpen: boolean) => void
  children: React.ReactNode
  trigger: React.ReactNode
  title: string
  description: string


}
export default function Modal(
  { isOpen, onChangeIsOpen, children, trigger }: ModalProps
) {
  return (
    <Dialog
      onOpenChange={() => onChangeIsOpen(!isOpen)}
      open={isOpen}
    >
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        {children}

      </DialogContent>
    </Dialog>
  )
}
