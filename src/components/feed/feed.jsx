import React, { useEffect, useState } from 'react'  // Import useState here
import './feed.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import { Link } from 'react-router-dom'
import { API_KEY } from '../../data'
import moment from 'moment'
import { value_converter } from '../../data'


const Feed = ({ category }) => {
    // Define state for data
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        
        
        // Fetch data and set state
        await fetch(videoList_url)
            .then(response => response.json())
            .then(data => setData(data.items));  // Use setData to update the state
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    return (
        <div className='feed'>
            {data.map((item, index) => (
                <Link to={`video/${item.snippet.categoryId}/${item.id}`} key={index} className='card'>
                    <img src={item.snippet.thumbnails.medium.url} alt="Thumbnail" />
                    <h2>{item.snippet.title}</h2>  
                    <h3>{item.snippet.channelTitle}</h3>  
                    <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                </Link>
            ))}
        </div>
    );
};

export default Feed;








 

    

    









