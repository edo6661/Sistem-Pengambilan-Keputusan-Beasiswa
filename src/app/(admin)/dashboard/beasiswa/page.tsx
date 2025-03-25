import React, { Suspense } from 'react'
import Beasiswa from '@/components/features/beasiswa/Beasiswa'
import { FormBeasiswa } from '@/components/features/beasiswa/FormBeasiswa'

const BeasiswaPage = () => {
  return (
    <div className='max-w-xl container'>
      <FormBeasiswa />
      <Suspense fallback='Loading...'>
        <Beasiswa />
      </Suspense>
    </div>
  )
}

export default BeasiswaPage