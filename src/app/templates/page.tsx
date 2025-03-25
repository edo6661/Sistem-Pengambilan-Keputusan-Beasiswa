import { FormTemplates } from '@/components/features/templates/FormTemplates'
import Templates from '@/components/features/templates/Templates'
import React, { Suspense } from 'react'

const TemplatePage = () => {
  return (
    <div className='max-w-xl container'>
      <FormTemplates />
      <Suspense fallback='Loading...'>
        <Templates />
      </Suspense>
    </div>
  )
}

export default TemplatePage