import React, { useState } from 'react'
import './video.css'
import PlayVideo from '../../components/playvideo/playvideo'
import Recomment from '../../components/recommend/recomment'
import { useParams } from 'react-router-dom'



const Video = () => {

  const {videoId,categoryId}=useParams();
  return (
    <div className='play-container'>
      <PlayVideo videoId={videoId} />
      <Recomment categoryId={categoryId}/>
      
    </div>
  )
}

export default Video
