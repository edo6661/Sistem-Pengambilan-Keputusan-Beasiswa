import { auth } from '@/lib/auth';
import { User } from '@prisma/client';
import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import TemporaryLoading from '../common/TemporaryLoading';

interface WithUserProps {
  children: (user: User) => React.ReactNode;
  fallback?: React.ReactNode;
}

const WithUser = async ({ children, fallback }: WithUserProps) => {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    return redirect('/auth/login');
  }


  return <>
    <Suspense fallback={
      fallback || <TemporaryLoading
        text="Loading user ..."
      />
    }

    >
      {children(user)}
    </Suspense>
  </>;
};

export default WithUser;
