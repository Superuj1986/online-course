import GlobalAPI from '@/app/_utils/GlobalAPI';
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

function CourseEnrollSection({courseInfo,isEnrolled}) {
  const membership=false;
  const {user} = useUser();
  const router = useRouter();
  const onEnroll=()=>{
    GlobalAPI.enrolltoCourse(courseInfo?.slug,user?.primaryEmailAddress?.emailAddress).then(resp=>{
      if ( resp ){
        toast("User Enrolled Successfully",{
          description:"User Enrolled to this Course",
        })
        router.push('/watch-course/'+resp.createUserEnrollCourse.id)
      }
    })
  }

  return (
    <div className='p-3 text-center rounded-sm bg-primary'>
      <h2 className='text-[22px] font-bold text-white'>Enroll to the Course</h2>
      {user&&(membership||courseInfo.free)&&!isEnrolled?<div className='flex flex-col gap-3 mt-3'>
        <h2 className='text-white font-light'>Enroll now to Start Learning and Building</h2>
        <Button className='bg-white text-primary hover:bg-white hover:text-primary'
        onClick={()=>onEnroll()}>
          Enroll now</Button>
      </div>
      :!user?
      <div className='flex flex-col gap-3 mt-3'>
        <h2 className='text-white font-light'>Enroll now</h2>
        <Link href={'/sign-in'}><Button className='bg-white text-primary hover:bg-white hover:text-primary'>
          Buy Monthly Membership and Get Access to All Courses</Button></Link>
      </div>
      :!isEnrolled&&<div className='flex flex-col gap-3 mt-3'>
        <h2 className='text-white font-light'>Buy Monthly Membership and Get Access to All Courses</h2>
        <Button className='bg-white text-primary hover:bg-white hover:text-primary'>
          Buy Membership Just $2.99</Button>
      </div>}
      {isEnrolled&&<div className='flex flex-col gap-3 mt-3'>
        <h2 className='text-white font-light'>Continue to Learn Your Project</h2>
        <Link href={'/watch-course/'+isEnrolled}><Button className='bg-white text-primary hover:bg-white hover:text-primary'>
          Continue</Button></Link>
      </div>}
    </div>
  )
}

export default CourseEnrollSection
