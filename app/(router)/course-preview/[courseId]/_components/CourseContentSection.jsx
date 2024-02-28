import { Lock, Play } from 'lucide-react'
import React, { useState } from 'react'

function CourseContentSection({courseInfo,isEnrolled,watchMode=false,
  setActiveChapterIndex,completedChapter}) {
    const [ activeIndex,setActiveIndex ] = useState(0);
    // const checkCompletedChapter=(chapterId)=>{
    // ${watchMode&&checkCompletedChapter(item.id)&&'border-green-800 bg-green-400'}
    //   const completedChapterItem = completedChapter.find(item=>item.chapterId==chapterId)
    // }
  return (
    <div className='p-3 bg-white rounded-sm'>
      <h2>Contents</h2>
      {courseInfo.chapter.map((item,index) => (
        <div>
            <h2 className={`p-2 text-[14px] flex justify-between items-center m-2
            border rounded-sm px-4 cursor-pointer
            hover:bg-gray-200 hover:text-gray-500
            ${activeIndex==index&&'bg-primary text-white'}
            ${isEnrolled&&'hover:bg-primary hover:text-white'}
            
            `}
            onClick={()=>{watchMode&&setActiveChapterIndex(index);watchMode&&setActiveIndex(index)}}
            >
                {index+1}.{item.name}
                {activeIndex==index||isEnrolled?
                <Play className='h-4 w-4'/>:
                <Lock className='h-4 w-4' />}
            </h2>
        </div>
      ))}
    </div>
  )
}

export default CourseContentSection
