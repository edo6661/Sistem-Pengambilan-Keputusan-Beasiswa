import { User } from '@prisma/client';
import React, { Suspense } from 'react'
import HomeAdmin from './HomeAdmin';
import HomeUser from './HomeUser';
interface HomeWrapperProps {
  user: User;
}
const HomeWrapper = (
  { user }: HomeWrapperProps
) => {
  return user.role === "ADMIN" ? <Suspense
    fallback={<div>Loading dari home admin</div>}
  >
    <HomeAdmin
      user={user}
    />
  </Suspense> : <Suspense
    fallback={<div>Loading dari home user</div>}
  >
    <HomeUser
      user={user}
    />
  </Suspense>
}

export default HomeWrapper