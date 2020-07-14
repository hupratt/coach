import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import GetCard from "../../containers/displayCard/displayCard";
import { useSelector, useDispatch } from "react-redux";
import { apiTitleUpdate, apiTaskContentUpdate } from "../../actions/task";

function Card({
  task,
  index,
  removeCard,
  column,
  editCard,
  data,
  moveCard,
  week,
}) {
  const dispatch = useDispatch();
  const values = useSelector((state) => state.tasks.values);
  const boards = useSelector((state) => state.columns.boards);

  const [isOpen, setIsOpen] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const [position, setPosition] = useState({ modalTop: "", modalLeft: "" });
  const [openCard, setOpenCard] = useState("");
  const [cardClicked, setcardClicked] = useState("");
  const handleBlur = (event, value) => {
    event.preventDefault();
    removeCard(value, column.id);
  };

  const handleSubmit = (event) => {
    event.persist();
    let customValues = values;
    customValues["week"] = week;
    customValues["id"] = task.id;
    if (
      event.target.id === "add-card-button" ||
      (event.keyCode === 13 && event.shiftKey === false)
    ) {
      dispatch(
        apiTaskContentUpdate(customValues, openCard, column.id, boards[0])
      );
      if (isOpen) setIsOpen(false);
    }
  };

  const handleChange = (event) => {
    event.persist();
    let customValues = values;
    customValues["title"] = event.target.value;
    if (
      event.target.id === "add-card-button" ||
      (openCard === "" && event.keyCode === 13 && event.shiftKey === false)
    ) {
      dispatch(
        apiTaskContentUpdate(customValues, openCard, column.id, boards[0])
      );
      if (isOpen) setIsOpen(false);
    }
  };

  const handleClick = (event) => {
    setcardClicked(task.id);
    setOpenCard(task.id);
    setIsOpen(!isOpen);
    setPosition({
      ...position,
      modalTop: event.clientY - 29,
      modalLeft: event.clientX - 231,
    });
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const handleMove = () => {
    setIsMove(!isMove);
  };
  const handleDelete = (value) => {
    removeCard(value, column.id);
  };

  const value = (
    <GetCard
      key={task.id}
      column={column}
      task={task}
      handleBlur={handleBlur}
      handleChange={handleChange}
      values={values}
      handleSubmit={handleSubmit}
      handleClick={handleClick}
      isOpen={isOpen}
      handleClose={handleClose}
      position={position}
      handleDelete={handleDelete}
      handleMove={handleMove}
      isMove={isMove}
      data={data}
      openCard={openCard}
      cardClicked={cardClicked}
      moveCard={moveCard}
    />
  );

  return (
    <Draggable draggableId={`task${task.id}`} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {value}
        </div>
      )}
    </Draggable>
  );
}
export default Card;
