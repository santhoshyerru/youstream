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
      <div className="w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
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
          className="w-full p-2 ml-2 border border-black"
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
            className="w-96 px-2"
            value={LiveMessage}
            onChange={(e) => setLiveMessage(e.target.value)}
            type="text"
          />
          <button className="px-2 mx-2 bg-green-100">Send</button>
        </form>
      </div>
    </>
  );
};

export default LiveChat;
