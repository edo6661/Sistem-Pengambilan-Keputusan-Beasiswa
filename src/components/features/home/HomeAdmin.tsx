import { getBeasiswas } from '@/querys/beasiswa.query';
import { User } from '@prisma/client';
import React from 'react'
import { TestTable } from '@/components/TestTable';
import { columns } from '@/components/columns';
interface HomeAdminProps {
  user: User;
}
const HomeAdmin = async (
  { user }: HomeAdminProps
) => {
  console.log("USER", user)
  const beasiswas = await getBeasiswas();

  return (
    <div>

      <TestTable
        columns={columns}
        data={beasiswas || []}

      />
    </div>
  )
}

export default HomeAdmin

