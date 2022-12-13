import React, { useEffect, useState } from "react";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
} from "../api";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({ currentUserId }) => {
  const [backendComments, setBackEndComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendFilter) => backendFilter.parentId === null
  );

  const getReplies = (commentId) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const addComment = (text, parentId) => {
    console.log(text, parentId);
    createCommentApi(text, parentId).then((comment) => {
      setBackEndComments([comment, ...backendComments]);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure?")) {
      deleteCommentApi(commentId).then(() => {
        const updatedBackEndComment = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackEndComments(updatedBackEndComment);
      });
    }
  };

  useEffect(() => {
    getCommentsApi().then((data) => setBackEndComments(data));
  }, []);

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-ttle">Write Comment</div>
      <CommentForm submitLable="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            currentUserId={currentUserId}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
