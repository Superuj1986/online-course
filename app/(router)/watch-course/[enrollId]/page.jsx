"use client"
import GlobalAPI from '@/app/_utils/GlobalAPI'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CourseVideoDecs from '../../course-preview/[courseId]/_components/CourseVideoDecs'
import CourseContentSection from '../../course-preview/[courseId]/_components/CourseContentSection';
import { toast } from 'sonner'

function WatchCourse({params}) {
  const {user} = useUser();
  const [ courseInfo,setCourseInfo ] = useState([]);
  const [ activeChapterIndex,setActiveChapterIndex ] = useState(0);
  const [ completedChapter,setCompletedChapter ] = useState([]);
  useEffect(()=>{
    params&&user&&getUserEnrolled();
  },[params&&user])
  const getUserEnrolled=()=>{
    GlobalAPI.getEnrolledCourse(params.enrollId,user.primaryEmailAddress.emailAddress).then(resp=>{
      setCourseInfo(resp.userEnrollCourses[0].courseList);
      console.log(resp.userEnrollCourses[0].completedChapter);
    })
  }
  const onChapterComplete=(chapterId)=>{
    GlobalAPI.markCompletedChapter(params.enrollId,chapterId).then(resp=>{
      if(resp){
        toast('Chapter Marked as Completed');
      }
    })
  }
  return courseInfo.name&&(
    <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-3'>
      <div className='col-span-2 bg-white p-3'>
        <CourseVideoDecs courseInfo={courseInfo}
        activeChapterIndex={activeChapterIndex}
        watchMode={true}
        setChapterCompleted={(chapterId)=>onChapterComplete(chapterId)}
        />
      </div>
      <div className=''>
        <CourseContentSection courseInfo={courseInfo}
        isEnrolled={true}
        watchMode={true}
        completedChapter={completedChapter}
        setActiveChapterIndex={(index)=>setActiveChapterIndex(index)}
        />
      </div>
    </div>
  )
}

export default WatchCourse
