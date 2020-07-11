import React, { useState } from "react";
import Card from "../../components/card/Card";
import "./CardColumn.css";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { apiTaskCreate } from "../../actions/task";

function CardColumn({
  column,
  tasks,
  index,
  removeCard,
  editCard,
  data,
  moveCard,
  deleteColumn,
  editColumnTitle,
  week,
}) {
  const dispatch = useDispatch();

  const [displayColumn, setDisplayColumn] = useState(false);
  const [editTitle, setEditTitle] = useState({
    title: column.title,
    id: column.id,
    taskIds: column.taskIds,
  });

  const [showInputTitle, setShowInputTitle] = useState(false);

  const handleclick = (colID, data, event) => {
    const card = {
      content: "",
      focus: true,
      button: "Add Card",
      week,
    };
    // task action: apiTaskCreate recuperer l'id de la task créée
    dispatch(apiTaskCreate(card, colID, data));
    // createCard(`task${maxOrderId}`, card, colID);
  };

  const showDelete = () => {
    setDisplayColumn(!displayColumn);
  };

  const handleDeleteColumns = (column) => {
    deleteColumn(column.id);
  };

  const handleEditcolumnTitle = (event) => {
    event.preventDefault();
    editColumnTitle(editTitle);
    setShowInputTitle(!showInputTitle);
  };
  const handleEditColumnTitleChange = (event) => {
    setEditTitle({ ...editTitle, title: event.target.value });
  };

  const toggleShowTitle = () => {
    setShowInputTitle(!showInputTitle);
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="column"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="list-header">
            <h2
              style={{ display: !showInputTitle ? "inline-block" : "none" }}
              className="list-header-text"
              onClick={toggleShowTitle}
            >
              {column.title}
            </h2>
            <form
              style={{ display: showInputTitle ? "inline-block" : "none" }}
              onSubmit={(event) => handleEditcolumnTitle(event)}
            >
              <input
                id="edit-column-title"
                type="text"
                value={editTitle.title}
                onChange={(event) => handleEditColumnTitleChange(event)}
              />
            </form>
            <div className="dropDown" onClick={showDelete}>
              <div className="list-header-icon">...</div>
              <div
                style={{ display: displayColumn ? "block" : "none" }}
                className="dropDown-content"
                onClick={() => handleDeleteColumns(column)}
              >
                delete column
              </div>
            </div>
          </div>
          <Droppable droppableId={column.id} type="task">
            {(provided) => (
              <div
                className="column-row-cards"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <ul className="row-cards">
                  {tasks.length > 0 &&
                    tasks.map(
                      (task, index) =>
                        task && (
                          <Card
                            task={task}
                            key={task.id}
                            index={index}
                            removeCard={removeCard}
                            column={column}
                            editCard={editCard}
                            data={data}
                            moveCard={moveCard}
                          />
                        )
                    )}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>

          <div className="card-bottom">
            <span className="card-bottom-icon">+</span>
            <span
              className="card-bottom-text"
              onClick={(e) => handleclick(column.id, data, e)}
            >
              Add another card
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default CardColumn;
