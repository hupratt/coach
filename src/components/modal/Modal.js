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
  const { columnsData } = data;

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

  const handleVal = (event, field, option) => {
    let value = field;
    value[option] = event.target.value;
    setVal({ ...val, ...value });
  };
  const displayColumn = data.columnOrder.map((columnItem) => {
    // const selected = columnsData[column].title === column.title;
    return (
      columnsData[columnItem] && (
        <option
          value={columnsData[columnItem].title}
          key={columnsData[columnItem].id}
        >
          {columnsData[columnItem].title}
        </option>
      )
    );
  });
  let displayPosition = <React.Fragment></React.Fragment>;
  if (column.taskIds) {
    displayPosition = column.taskIds.map((cardPosition, index) => {
      return (
        <option value={index + 1} key={cardPosition}>
          {index + 1}
        </option>
      );
    });
  }

  const handleCardMove = (
    card,
    column,
    previousposition,
    previousColumn,
    val
  ) => {
    moveCard(card, column, previousposition, previousColumn, val);
  };
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
