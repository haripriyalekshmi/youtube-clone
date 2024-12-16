import React, { useEffect, useState } from 'react';
import './recomment.css';
import { API_KEY } from '../../data';
import { value_converter } from '../../data';
import { Link } from 'react-router-dom';

const Recomment = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
      const res = await fetch(relatedVideo_url);
      const data = await res.json();
      setApiData(data.items);
    } catch (error) {
      console.error("Error fetching related videos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="recommended">
      {apiData.map((item, index) =>{
        return (
        <Link to={`/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
          <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title} />
          <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.statistics.viewCount)} Views</p>
          </div>
        </Link>
        )
})}
    </div>
  );
};

export default Recomment;

 