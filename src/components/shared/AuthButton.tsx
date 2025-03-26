"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { LogIn, UserPlus } from 'lucide-react'

const AuthButton = () => {
  const router = useRouter()
  return (
    <div className='flex items-center gap-4'>
      <Button
        onClick={() => {
          router.push('/auth/register')
        }}
        variant="outline"
      >
        <UserPlus />
      </Button>
      <Button
        onClick={() => {
          router.push('/auth/login')
        }}
        variant="outline"

      >
        <LogIn />
      </Button>
    </div>
  )
}

export default AuthButton