import moment from "moment";
import React from "react";

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  console.log(snippet, statistics);
  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  return (
    <div className="p-2 m-2 w-72 h-80 shadow-lg dark:bg-gray-950 dark:shadow-gray-900">
      <img className="rounded-lg" src={thumbnails.medium.url} alt="thumbnail" />
      <ul>
        <li className="font-bold py-2 text-ellipsis overflow-hidden ">
          {title}
        </li>
        <li>{channelTitle}</li>
        <div className="flex">
          <li> {statistics && `Views: ${statistics?.viewCount}`}</li>
          <li className=""> ・{moment(publishedAt).fromNow()}</li>
        </div>
      </ul>
    </div>
  );
};

export default VideoCard;
