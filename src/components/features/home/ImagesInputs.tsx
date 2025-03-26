import React from 'react'
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FormLabel } from "@/components/ui/form"
import ImageUpload from "@/components/shared/ImageUploader"
import ImagesUploader from "@/components/shared/ImagesUploader"
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { z } from 'zod'
import { beasiswaSchema } from '@/validation/beasiswa_schema'
interface ImagesInputsProps {
  watch: UseFormWatch<z.infer<typeof beasiswaSchema>>;
  setValue: UseFormSetValue<z.infer<typeof beasiswaSchema>>;
}
const ImagesInputs = ({ watch, setValue }: ImagesInputsProps) => {
  return (
    <div className="flex justify-between items-center gap-8 flex-wrap mx-auto">
      <div>
        {watch("transkripImage") && (
          <div className="flex justify-center gap-4">
            <Image src={watch("transkripImage")!} width={300} height={300} alt="Preview" />
            <Button
              onClick={() => setValue("transkripImage", "")}
            >
              <X />
            </Button>
          </div>
        )}

        {!watch("transkripImage") && (
          <div>
            <FormLabel>Transkrip</FormLabel>
            <ImageUpload
              setValue={(value) => setValue("transkripImage", value)}
              name="transkripImage"
            />
          </div>
        )}
      </div>

      <div>
        {(watch("prestasiImages")?.length > 0) && (
          <div className="flex gap-4 flex-wrap items-center justify-center ">
            {watch("prestasiImages")?.map((url, index) => (
              <div key={index} className="relative">
                <Image src={url} width={150} height={150} alt={`Prestasi-${index}`} />
                <Button
                  className="absolute top-0 right-0"
                  size="icon"
                  onClick={() => {
                    const newImages = watch("prestasiImages").filter((_, i) => i !== index);
                    setValue("prestasiImages", newImages);
                  }}
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>
        )}

        {(!watch("prestasiImages") || watch("prestasiImages")?.length === 0) && (
          <div>
            <FormLabel>Prestasi Images</FormLabel>
            <ImagesUploader
              setValue={(images) => setValue("prestasiImages", images)}
              name="prestasiImages"
              currentImages={watch("prestasiImages")}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ImagesInputs;
