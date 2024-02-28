import React from 'react'

function VideoPlayer({videoUrl,poster}) {
  return (
    <video width={1000} height={250} controls className='rounded-sm'
    poster={poster}
    key={videoUrl}
    >
        <source src={videoUrl} type='video/mp4' />
    </video>
  )
}

export default VideoPlayer
