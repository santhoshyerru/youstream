import React from "react";
import { YOUTUBE_BUTTON_API, YOUTUBE_SEARCH_API } from "../utils/constants";
import { addVideos } from "../utils/mainVideoSlice";
import { useDispatch } from "react-redux";

const Button = ({ name }) => {
  const dispatch = useDispatch();
  const handleButtonClick = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + name);
    const json = await data.json();
    console.log(json);
    // setVideos(json.items);
    dispatch(addVideos(json.items));
  };
  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="px-5 py-2 m-2 bg-gray-200 rounded-lg dark:bg-gray-900  dark:border dark:border-white"
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
