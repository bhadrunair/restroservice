import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='h-12 md:h-24 p-4 flex justify-between items-center text-red-500 lg:px-20 xl:px-40'>
      <Link href="/" className='font-bold text-xl'>ILLUSTER</Link>
      <p>&copy; ALL RIGHTS RESERVED</p>
    </div>
  )
}

export default Footer