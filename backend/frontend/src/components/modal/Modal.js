import React, { useState, useEffect } from "react";
import CategoryDropDown from "../button/CategoryDropDown";

const Modal = ({
  task,
  handleChange,
  isOpen,
  values,
  handleClose,
  position,
  handleSubmit,
  handleDelete,
  handleMove,
  isMove,
  data,
  column,
  openCard,
  cardClicked,
  moveCard,
}) => {
  const [val, setVal] = useState({
    col1: column.title,
    pos1: openCard ? column.taskIds.indexOf(openCard) + 1 : 0,
    col: column.title,
    pos: openCard ? column.taskIds.indexOf(openCard) + 1 : 0,
  });

  useEffect(() => {
    if (column.taskIds) {
      setVal({ ...val, pos: column.taskIds.indexOf(openCard) + 1 });
    }
  }, [openCard]);

  return (
    <div className="modal" style={{ display: isOpen ? "block" : "none" }}>
      <span onClick={handleClose} className="close">
        &times;
      </span>
      <div
        className="modal-wrapper"
        onKeyDown={(event) => handleSubmit(event)}
        style={{
          top: position.modalTop ? `${position.modalTop}px` : undefined,
          left: position.modalLeft ? `${position.modalLeft}px` : undefined,
        }}
      >
        <h2>Task</h2>
        <textarea
          className="modal-content"
          name=""
          cols="23"
          rows="1"
          autoFocus
          onChange={(event) => handleChange(event, task)}
          value={values.content}
          placeholder={task.content}
        ></textarea>
        <h2>Category</h2>
        <CategoryDropDown />
        <div className="modal-actions-wrapper">
          <div className="modal-actions" onClick={() => handleDelete(task)}>
            Delete
          </div>
          <div onClick={handleSubmit} className="modal-actions">
            Save
          </div>
          <div onClick={handleClose} className="modal-actions">
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
