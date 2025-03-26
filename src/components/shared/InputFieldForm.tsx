import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Eye } from 'lucide-react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

interface InputFieldFormProps<T extends FieldValues> {
  form: UseFormReturn<T>
  isShowPassword?: boolean
  toggleIsShowPassword?: () => void
  label: string
  name: Path<T>
  placeholder: string
  type?: string
}

const InputFieldForm = <T extends FieldValues>({
  form,
  label,
  name,
  placeholder,
  type = 'text',
  isShowPassword,
  toggleIsShowPassword,
}: InputFieldFormProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder={placeholder}
                {...field}

                type={isShowPassword ? 'text' : type}
              />
              {type === 'password' && (
                <Eye
                  onClick={() => {
                    if (toggleIsShowPassword) {
                      toggleIsShowPassword()
                    }
                  }}
                  className={`absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 ${isShowPassword ? 'text-primary-500' : 'text-muted-foreground'}`}
                />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputFieldForm
