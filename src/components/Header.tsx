import { auth, signOut } from '@/lib/auth';
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import ToggleTheme from './shared/ToggleTheme';


const Header = async () => {
  const session = await auth();
  const user = session?.user;


  return (
    <header className='container flex justify-between'>
      <Link href="/">
        Home
      </Link>
      {user && (
        <>

          <Link href="/dashboard/beasiswa">
            Beasiswa
          </Link>
          <Button
            className='cursor-pointer'
            onClick={async () => {
              "use server"
              await signOut({
                redirectTo: "/auth/login",
              })
            }}
            variant="outline"
          >
            <LogOut />
          </Button>
        </>
      )}
      {!user && (

        <>
          <Link href="/auth/register">
            Register
          </Link>
          <Link href="/auth/login">
            Login
          </Link>

        </>
      )}
      <ToggleTheme />
    </header>
  )
}

export default Header