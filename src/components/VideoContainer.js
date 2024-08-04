import React, { useEffect, useState } from "react";
import { YOUTUBE_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { addVideos, appendVideos } from "../utils/mainVideoSlice";
import { useDispatch, useSelector } from "react-redux";

const VideoContainer = () => {
  // const [videos, setVideos] = useState([]);
  const videos = useSelector((store) => store.videos);
  console.log("videos", videos);
  const dispatch = useDispatch();
  const [pageToken, setPageToken] = useState("");
  useEffect(() => {
    getVideos();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      loadMoreVideos();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageToken]);

  const getVideos = async (pageToken = "") => {
    const response = await fetch(`${YOUTUBE_API}&pageToken=${pageToken}`);
    const json = await response.json();
    if (pageToken === "") {
      dispatch(addVideos(json.items));
    } else {
      dispatch(appendVideos(json.items));
    }

    setPageToken(json.nextPageToken);
  };

  const loadMoreVideos = () => {
    if (pageToken) {
      getVideos(pageToken);
    }
  };
  return (
    <div className="flex flex-wrap justify-center">
      {videos?.map((video) => (
        <Link
          key={typeof video.id === "string" ? video.id : video.id.videoId}
          to={
            "/watch?v=" +
            (typeof video.id === "string" ? video.id : video.id.videoId)
          }
        >
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
