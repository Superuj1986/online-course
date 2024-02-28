"use client"
import React from 'react'
import { BadgeIcon, BookOpen, GraduationCap, LayoutDashboard, Mail, Store } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

function SideNav() {
  const {user} = useUser();
  const menu=[
    {
      id:1,
      name:'Dashboard',
      icon:LayoutDashboard,
      path:'/dashboard',
      auth:user
    },
    {
      id:2,
      name:'All Courses',
      icon:BookOpen,
      path:'/courses',
      auth:true
    },
    {
      id:3,
      name:'Store',
      icon:Store,
      path:'/store',
      auth:true
    },
    {
      id:4,
      name:'Membership',
      icon:BadgeIcon,
      path:'/membership',
      auth:true
    },
    {
      id:5,
      name:'Be Instructor',
      icon:GraduationCap,
      path:'/instructor',
      auth:true
    },
    {
      id:6,
      name:'Newsletter',
      icon:Mail,
      path:'/newsletter',
      auth:true
    }
  ]
  const path = usePathname();
  return (
    <div className='p-5 bg-white shadow-sm border h-screen'>
      <Image src='/logoipsum-330.svg' alt='logo' width={170} height={80}/>
      <hr className='mt-7'></hr>
      <div className='mt-5'>
        {menu.map((item,index) => item.auth&&(
          <Link href={item.path}>
          <div className={`group flex gap-3 mt-2 p-3 text-[20px] items-center text-gray-500
          cursor-pointer hover:bg-primary hover:text-white rounded-md transition-all ease-in-out duration-200
          ${path.includes(item.path)&&'bg-primary text-white'}
          `}>
            <item.icon className='group-hover:animate-bounce'/>
            <h2>{item.name}</h2>
          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SideNav
