import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import GetCard from "../displayCard/displayCard";
import { useDispatch } from "react-redux";
import { apiTaskCreate, apiTaskContentUpdate } from "../../actions/task";

function Card({ task, index, removeCard, column, editCard, data, moveCard }) {
  const [values, setValues] = useState({
    content: "",
  });
  const dispatch = useDispatch();

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
    if (
      event.target.id === "add-card-button" ||
      (openCard === "" && event.keyCode === 13 && event.shiftKey === false)
    ) {
      dispatch(apiTaskCreate(values, column.id));
      editCard(values, column.id);
      setValues({ content: "" });
      if (isOpen) setIsOpen(false);
    } else if (event.keyCode === 13 && event.shiftKey === false) {
      dispatch(apiTaskContentUpdate(values, openCard, column.id));
      if (isOpen) setIsOpen(false);
    }
  };

  const handleChange = (event, card) => {
    event.persist();
    setValues({ ...values, ...card, content: event.target.value });
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
    <Draggable draggableId={task.id} index={index}>
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
