"use client"
import { BellDot, Search } from 'lucide-react'
import { } from '@/components/'
import React from 'react'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

function Header() {
  const {user,isLoaded} = useUser();
  return (
    <div className='p-4 bg-white flex justify-between'>
      <div className='flex gap-2 border p-2 rounded-md'>
        <Search className='h-5 w-5'/>
        <input type='text' placeholder='Search...' className='outline-none'/>
      </div>
      <div className='flex items-center gap-4'>
        <BellDot className='text-gray-500'/>
        {isLoaded&&user?
        <UserButton afterSignOutUrl='/courses'/>
        :
        <Link href={'/sign-in'}>
        <Button>Get Started</Button>
        </Link>}
      </div>
    </div>
  )
}

export default Header
