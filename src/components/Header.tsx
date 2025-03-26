import { auth, signOut } from '@/lib/auth';
import Link from 'next/link'
import React from 'react'
import ToggleTheme from './shared/ToggleTheme';
import LogoutButton from './shared/LogoutButton';


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
          <LogoutButton
            onSignOut={async () => {
              "use server"
              await signOut();
            }}
          />
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