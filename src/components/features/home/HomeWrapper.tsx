import { User } from '@prisma/client';
import React, { Suspense } from 'react'
import HomeAdmin from './HomeAdmin';
import HomeUser from './HomeUser';
import TemporaryLoading from '@/components/common/TemporaryLoading';
interface HomeWrapperProps {
  user: User;
}
const HomeWrapper = (
  { user }: HomeWrapperProps
) => {
  return user.role === "ADMIN" ? <Suspense
    fallback={<TemporaryLoading />}
  >
    <HomeAdmin
      user={user}
    />
  </Suspense> : <Suspense
    fallback={<TemporaryLoading />}
  >
    <HomeUser
      user={user}
    />
  </Suspense>
}

export default HomeWrapper