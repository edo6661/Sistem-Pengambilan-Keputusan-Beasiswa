import { User } from '@prisma/client';
import React from 'react'
interface HomeAdminProps {
  user: User;
}
const HomeAdmin = (
  { user }: HomeAdminProps
) => {
  console.log("user", user)
  return (
    <div>HomeAdmin</div>
  )
}

export default HomeAdmin