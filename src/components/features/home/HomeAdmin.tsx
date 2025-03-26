import { getBeasiswas } from '@/querys/beasiswa.query';
import { User } from '@prisma/client';
import React from 'react'
import Beasiswa from './Beasiswa';
import { TestTable } from '@/components/TestTable';
import { columns, Payment } from '@/components/columns';
interface HomeAdminProps {
  user: User;
}
const HomeAdmin = async (
  { user }: HomeAdminProps
) => {
  const beasiswas = await getBeasiswas();
  const data = await getData()
  console.log("user", user)

  return (
    <div>
      <div>
        {beasiswas?.map((beasiswa) => <Beasiswa
          {...beasiswa}
          key={beasiswa.id}
        />)}
      </div>
      <TestTable
        columns={columns}
        data={data}

      />
    </div>
  )
}

export default HomeAdmin

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      month: "January",
    },
    // ...
  ]
}

