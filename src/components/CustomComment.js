import React, { useState } from "react";
import moment from "moment";
import { YOUTUBE_API_KEY } from "../utils/constants";

const CustomComment = ({ data }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const {
    authorProfileImageUrl,
    authorDisplayName,
    textDisplay,
    publishedAt,
    totalReplyCount,
  } = data.snippet.topLevelComment.snippet;

  const relativeTime = moment(publishedAt).fromNow();

  const fetchReplies = async () => {
    console.log(totalReplyCount);
    if (!totalReplyCount) return;

    try {
      const repliesResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${data.snippet.videoId}&key=${YOUTUBE_API_KEY}&parentId=${data.id}`
      );
      const repliesData = await repliesResponse.json();
      console.log(repliesData);
      setReplies(repliesData.items);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  const handleShowReplies = async () => {
    console.log(showReplies);
    if (!showReplies) {
      await fetchReplies();
    }
    setShowReplies(!showReplies);
  };

  return (
    <div className="flex flex-col mb-4 p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800">
      <div className="flex items-start">
        <img
          className="w-10 h-10 rounded-full"
          src={authorProfileImageUrl}
          alt={authorDisplayName}
        />
        <div className="ml-3 flex-1">
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            {authorDisplayName}
          </p>
          <p className="text-gray-600 dark:text-gray-300">{textDisplay}</p>
          <p className="text-gray-500 text-sm">{relativeTime}</p>
          {totalReplyCount > 0 && (
            <button
              onClick={handleShowReplies}
              className="mt-2 text-blue-500 hover:underline"
            >
              {showReplies
                ? "Hide Replies"
                : `Show Replies (${totalReplyCount})`}
            </button>
          )}
          {showReplies && replies.length > 0 && (
            <div className="ml-5 mt-2 border-l border-gray-300 pl-4">
              {replies.map((reply, index) => (
                <CustomComment key={index} data={reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomComment;
