import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import {
  YOUTUBE_API_KEY,
  YOUTUBE_CHANNEL_API,
  YOUTUBE_VIDEO_STATS,
} from "../utils/constants";
import CustomComments from "./CustomComments";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();
  const [videoDetails, setVideoDetails] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]);
  // useEffect(async () => {
  //   // const data = await fetch(YOUTUBE_CHANNEL_API+)
  // }, []);
  // useEffect(async () => {
  //   const data = await fetch(YOUTUBE_CHANNEL_API);
  //   const channel = await data.json();
  //   const videoData = await fetch(YOUTUBE_VIDEO_STATS + videoId);
  //   const videoStats = await videoData.json();
  //   console.log("video stats", videoStats, channel);
  // }, []);
  useEffect(() => {
    const fetchVideoDetails = async () => {
      const videoData = await fetch(YOUTUBE_VIDEO_STATS + videoId);
      const videoStats = await videoData.json();
      setVideoDetails(videoStats?.items?.[0]);

      const channelId = videoStats.items?.[0].snippet.channelId;
      const channelData = await fetch(YOUTUBE_CHANNEL_API + channelId);
      const channelInfo = await channelData.json();
      setChannelDetails(channelInfo?.items?.[0]);
      const commentsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${YOUTUBE_API_KEY}`
      );
      const commentsData = await commentsResponse.json();
      setComments(commentsData?.items);
    };

    fetchVideoDetails();
  }, [videoId]);
  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex flex-wrap md:flex-nowrap w-full">
        <div className="w-full md:w-7/12 lg:w-3/4 p-2">
          <iframe
            src={"https://www.youtube.com/embed/" + videoId}
            className="w-full aspect-video"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          {videoDetails && (
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">
                {videoDetails.snippet.title}
              </h2>
              <div className="flex justify-between border p-2 border-black dark:border-white">
                <div className="flex items-center mt-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={channelDetails?.snippet.thumbnails.default.url}
                    alt="channel"
                  />
                  <span className="ml-2 text-lg">
                    {videoDetails.snippet.channelTitle}
                  </span>
                </div>
                <div className="mt-2 text-lg">
                  👍 {videoDetails.statistics.likeCount} likes
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full md:w-5/12 lg:w-1/4 p-2">
          <LiveChat />
        </div>
      </div>
      <div className="mt-4">
        <CommentsContainer />
      </div>
      <div className="mt-4">
        <CustomComments comments={comments} />
      </div>
    </div>
  );
};

export default WatchPage;
