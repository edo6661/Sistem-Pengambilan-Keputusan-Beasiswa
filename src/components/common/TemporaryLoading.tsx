import React from 'react'

const TemporaryLoading = (
  { text = "Temporary Loading" }: { text?: string }
) => {
  return (
    <div className='container flex items-center justify-center w-full '>
      <p className='text-center'>
        {text}
      </p>
    </div>
  )
}

export default TemporaryLoading