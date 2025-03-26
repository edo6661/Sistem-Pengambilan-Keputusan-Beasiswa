"use client"

import Modal from "@/components/shared/Modal"
import { useState } from "react"
import { FormBeasiswa } from "./FormBeasiswa"
import { Beasiswa } from "@prisma/client"
interface EditBeasiswaProps {
  beasiswa: Beasiswa
  userId: string
}
const EditBeasiswa = (
  { beasiswa, userId }: EditBeasiswaProps
) => {
  const [isOpen, setIsOpen] = useState(false)
  const onChangeIsOpen = (isOpen: boolean) => {
    setIsOpen(isOpen)
  }
  return (
    <div>

      <Modal
        isOpen={isOpen}
        onChangeIsOpen={onChangeIsOpen}
        title="Edit Beasiswa"
        description="Edit Beasiswa description"
        trigger={<button>Edit Beasiswa</button>}
      >
        <FormBeasiswa
          userId={userId}
          beasiswa={beasiswa}
          onSuccess={() => {
            onChangeIsOpen(false)
          }
          }

        />
      </Modal>

    </div>
  )
}

export default EditBeasiswa