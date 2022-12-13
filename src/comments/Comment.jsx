import React from "react";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  replies,
  currentUserId,
  deleteComment,
  activeComment,
  setActiveComment,
  parentId = null,
  addComment,
  updateComment,
}) => {
  const fiveMins = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMins;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const canDelete = currentUserId === comment.userId;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const isReplaying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;

  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.id;

  const replyId = parentId ? parentId : comment.id;

  return (
    <div className="comment">
      <div className="comment-image-container">
        <img
          src={
            "https://github.com/monsterlessonsacademy/monsterlessonsacademy/raw/144-react-comments/public/user-icon.png"
          }
        />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing ? (
          <div className="comment-text">{comment.body}</div>
        ) : (
          <CommentForm
            submitLable={"Update"}
            hasCancleBtn
            intialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancle={() => activeComment(null)}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ type: "replying", id: comment.id })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ type: "edting", id: comment.id })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplaying && (
          <CommentForm
            submitLable={"Reply"}
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                replies={[]}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                parentId={comment.id}
                addComment={addComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                updateComment={updateComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
