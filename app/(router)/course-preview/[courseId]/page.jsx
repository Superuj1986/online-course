"use client"
import React, { useEffect, useState } from 'react'
import CourseVideoDecs from './_components/CourseVideoDecs';
import GlobalAPI from '@/app/_utils/GlobalAPI';
import CourseEnrollSection from './_components/CourseEnrollSection';
import { usePathname } from 'next/navigation';
import CourseContentSection from './_components/CourseContentSection';
import { useUser } from '@clerk/nextjs';

function CoursePreview({params}) {
  const {user} = useUser();
    const [ courseInfo,setCourseInfo ] = useState();
    const [ isEnrolled,setIsEnrolled ] = useState();
    useEffect(() => {
      params&&getCourseInfoById();
    },[params])
    useEffect(()=>{
      courseInfo&&user&&checkUserEnrolled();
    },[courseInfo,user])
    const getCourseInfoById=()=>{
      GlobalAPI.getCoursebyId(params?.courseId).then(resp=>{
        setCourseInfo(resp?.courseList);
      })
    }
    const checkUserEnrolled=()=>{
      GlobalAPI.checkUser(courseInfo.slug,user.primaryEmailAddress.emailAddress).then(resp=>{
        if(resp?.userEnrollCourses){
          setIsEnrolled(resp?.userEnrollCourses[0]?.id);
        }
      })
    }
  return courseInfo&&(
    <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-3'>
      <div className='col-span-2 bg-white p-3'>
        <CourseVideoDecs courseInfo={courseInfo} />
      </div>
      <div className=''>
        <CourseEnrollSection courseInfo={courseInfo} isEnrolled={isEnrolled} />

        <CourseContentSection courseInfo={courseInfo} isEnrolled={true} watchMode={true}
        setActiveChapterIndex={(index)=>con}
        />
      </div>
    </div>
  )
}

export default CoursePreview
