import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName } from "../utils/helper";

const LiveChat = () => {
  const [LiveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.message);
  useEffect(() => {
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: "you are an legend",
        })
      );
    }, 1500);
    return () => {
      clearInterval(i);
    };
  }, []);
  return (
    <>
      <div className="w-full p-4 ml-2 px-8 font-bold border border-b-0 rounded-t-lg border-black dark:border-gray-200">
        Live Chat
      </div>
      <div className="w-full h-[600px] ml-2 p-2 border border-black bg-slate-100  overflow-y-scroll flex flex-col-reverse dark:bg-gray-900 dark:border dark:border-white no-scrollbar">
        <div>
          {chatMessages?.map((chatMessage, index) => (
            <ChatMessage
              key={index}
              name={chatMessage.name}
              message={chatMessage.message}
            />
          ))}
        </div>
      </div>
      <div>
        <form
          className="w-full p-2 ml-2 border border-black dark:border-gray-200  dark:rounded-b-lg flex"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("On form submmit", LiveMessage);
            dispatch(
              addMessage({
                name: "santhosh",
                message: LiveMessage,
              })
            );
            setLiveMessage("");
          }}
        >
          <input
            className="p-2 border-b focus:outline-none focus:border-b-2 w-full dark:bg-gray-900 dark:text-gray-200 border-b-gray-100 focus:border-b-blue-300"
            value={LiveMessage}
            onChange={(e) => setLiveMessage(e.target.value)}
            type="text"
          />
          <button class="p-2 mx-2 border border-gray-400 rounded-lg">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default LiveChat;
