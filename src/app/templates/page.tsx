import TemporaryLoading from '@/components/common/TemporaryLoading'
import { FormTemplates } from '@/components/features/templates/FormTemplates'
import Templates from '@/components/features/templates/Templates'
import React, { Suspense } from 'react'

const TemplatePage = () => {
  return (
    <div className='max-w-xl container'>
      <FormTemplates />
      <Suspense fallback={<TemporaryLoading />}>
        <Templates />
      </Suspense>
    </div>
  )
}

export default TemplatePage