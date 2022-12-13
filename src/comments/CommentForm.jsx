import React, { useState } from "react";

const CommentForm = ({
  handleSubmit,
  submitLable,
  hasCancleBtn = false,
  intialText = "",
  handleCancle,
}) => {
  const [text, setText] = useState(intialText);
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="comment-form-button" disabled={isTextareaDisabled}>
        {submitLable}
      </button>
      {hasCancleBtn && (
        <button
          className="comment-form-button comment-form-cancle-button"
          onClick={handleCancle}
        >
          Cancle
        </button>
      )}
    </form>
  );
};

export default CommentForm;
