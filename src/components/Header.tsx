import { auth, signOut } from '@/lib/auth';
import React from 'react'
import ToggleTheme from './shared/ToggleTheme';
import LogoutButton from './shared/LogoutButton';
import AuthButton from './shared/AuthButton';


const Header = async () => {
  const session = await auth();
  const user = session?.user;


  return (
    <header className='container'>
      <div className='flex justify-between py-4'>

        {user && (
          <LogoutButton
            onSignOut={async () => {
              "use server"
              await signOut();
            }}
          />
        )}
        {!user && (
          <AuthButton />
        )}
        <ToggleTheme />
      </div>
    </header>
  )
}

export default Header