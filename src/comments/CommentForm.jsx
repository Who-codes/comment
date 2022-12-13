import React, { useState } from "react";

const CommentForm = ({ handleSubmit, submitLable }) => {
  const [text, setText] = useState("");
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
    </form>
  );
};

export default CommentForm;
