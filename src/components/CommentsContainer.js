import React from "react";

const commentsData = [
  {
    name: "Santhosh",
    comment: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [],
  },
  {
    name: "Santhosh",
    comment: "Lorem ipsum dolor sit amet, consectetur adip",
    replies: [
      {
        name: "Santhosh",
        comment: "Lorem ipsum dolor sit amet, consectetur adip",
        replies: [
          {
            name: "Santhosh",
            comment: "Lorem ipsum dolor sit amet, consectetur adip",
            replies: [
              {
                name: "Santhosh",
                comment: "Lorem ipsum dolor sit amet, consectetur adip",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
];
const Comment = ({ data }) => {
  const { name, comment, replies } = data;
  return (
    <div className="flex shadow-lg p-2 rounded-lg bg-gray-100">
      <img
        className="w-8 h-8"
        alt="user"
        src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
      />
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p>{comment}</p>
      </div>
    </div>
  );
};
const CommentsList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div>
      <Comment key={index} data={comment} />
      <div className="pl-5 border border-l-black ml-5">
        <CommentsList comments={comment.replies} />
      </div>
    </div>
  ));
};
const CommentsContainer = () => {
  return (
    <div className="p-2 m-2">
      <h1 className="text-2xl font-bold">Comments</h1>
      <Comment data={commentsData[0]} />
      <CommentsList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
