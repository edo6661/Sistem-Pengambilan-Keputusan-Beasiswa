import { getBeasiswas } from '@/querys/beasiswa.query';
import { User } from '@prisma/client';
import React from 'react'
import { TestTable } from '@/components/TestTable';
import { columns } from '@/components/columns';
interface HomeAdminProps {
  user: User;
}
const HomeAdmin = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { user }: HomeAdminProps
) => {
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

