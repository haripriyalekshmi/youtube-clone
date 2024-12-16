import React, { useEffect, useState } from 'react'
import './playvideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {
  const {videoId}=useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    try {
      const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
      const res = await fetch(videoDetails_url);
      const data = await res.json();
      setApiData(data.items[0]);
    } catch (error) {
      console.error("Error fetching video data", error);
    }
  }

  const fetchOtherData = async () => {
    if (!apiData) return;

    try {
      // Fetching channel data
      const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const res = await fetch(channelData_url);
      const data = await res.json();
      setChannelData(data.items[0]);

      // Fetching comment data
      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
      const commentRes = await fetch(comment_url);
      const commentData = await commentRes.json();
      setCommentData(commentData.items);
    } catch (error) {
      console.error("Error fetching other data", error);
    }
  }

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className='play-video'>
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
      <div className='play-video-info'>
        <p>{apiData ? value_converter(apiData.statistics.viewCount) : "16K"} Views &bull; 2 days ago</p>
        <div>
          <span><img src={like} alt="" />{apiData ? value_converter(apiData.statistics.likeCount) : 155}</span>
          <span><img src={dislike} alt="" /></span>
          <span><img src={share} alt="" />Share</span>
          <span><img src={save} alt="" />Save</span>
        </div>
      </div>
      <hr />
      <div className='publisher'>
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className='vid-description'>
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description Here"}</p>
        <p>Subscribe to watch more</p>
        <hr />
        <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 102} Comments</h4>

        {commentData.map((item, index) => {
          return (
            <div key={index} className='comment'>
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className='comment-action'>
                  <img src={like} alt="" />
                  <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default PlayVideo;




