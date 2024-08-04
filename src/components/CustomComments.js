import React from "react";
import CustomComment from "./CustomComment";

const CustomComments = ({ comments }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      {comments?.map((comment, index) => (
        <CustomComment key={index} data={comment} />
      ))}
    </div>
  );
};

export default CustomComments;
