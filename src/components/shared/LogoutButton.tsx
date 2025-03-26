"use client"
import React from 'react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

const LogoutButton = (
  { onSignOut }: { onSignOut: () => void }
) => {
  const router = useRouter()
  return (
    <Button
      className='cursor-pointer'
      onClick={() => {
        onSignOut()
        router.replace('/auth/login')
        router.refresh()
      }}
      variant="outline"
    >
      <LogOut />
    </Button>)
}

export default LogoutButton