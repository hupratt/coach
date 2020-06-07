import React, { useState, useEffect } from "react";
import "./App.css";
import CardColumn from "./containers/CardColumn/CardColumn";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Navbar from "./components/navbar/Navbar";
import { login } from "./actions/auth";
import {
  setColumns,
  setColumnName,
  setAddColumn,
  initColumns,
} from "./actions/columns";
import uuidv4 from "uuid/v4";
import Timeline from "./react-life-timeline/Timeline";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columns.columns);
  const addColumn = useSelector((state) => state.columns.addColumn);
  const columnName = useSelector((state) => state.columns.columnName);

  useEffect(() => {
    login("admin", "admin");
  }, []);
  useEffect(() => {
    dispatch(initColumns());
  }, []);

  const editCard = (card) => {
    const { id } = card;
    const newColumns = {
      ...columns,
      tasks: { ...columns.tasks, [id]: card },
    };
    dispatch(setColumns({ ...newColumns }));
  };

  const createCard = (name, card, id) => {
    const newColumns = columns;
    newColumns.tasks[name] = card;
    newColumns.columnsData[id].taskIds.push(name);
    dispatch(setColumns({ ...newColumns }));
  };

  const removeCard = (card, columnId) => {
    const { id } = card;
    const data = columns;
    data.columnsData[columnId].taskIds = data.columnsData[
      columnId
    ].taskIds.filter((cardId) => id !== cardId);
    console.log("deleting card data", data.length);

    setColumns({ ...data });
  };

  const onDragEnd = (results) => {
    const { destination, source, draggableId, type } = results;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(columns.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...columns,
        columnOrder: newColumnOrder,
      };
      dispatch(setColumns(newState));
      return;
    }

    const start = columns.columnsData[source.droppableId];
    const finish = columns.columnsData[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newData = {
        ...columns,

        columnsData: {
          ...columns.columnsData,
          [newColumn.id]: newColumn,
        },
      };
      dispatch(setColumns(newData));
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...columns,
      columnsData: {
        ...columns.columnsData,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    dispatch(setColumns(newState));
  };

  const moveCard = (card, column, previousposition, previousColumn, val) => {
    val.pos = parseInt(val.pos - 1);
    if (previousposition === val.pos && previousColumn === val.col) return;
    let finishid = columns.columnOrder.filter(
      (column) => columns.columnsData[column].title === val.col
    );
    finishid = finishid.toString();
    const start = columns.columnsData[column.id];
    const finish = columns.columnsData[finishid];

    if (previousColumn === val.col && previousposition !== val.pos) {
      const newTaskIds = Array.from(start.taskIds);
      const index = newTaskIds.indexOf(card.id);
      newTaskIds.splice(index, 1);
      newTaskIds.splice(val.pos, 0, card.id);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newData = {
        ...columns,
        columnsData: {
          ...columns.columnsData,
          [newColumn.id]: newColumn,
        },
      };
      dispatch(setColumns(newData));
      return;
    }
    if (previousColumn !== val.col && previousposition !== val.pos) {
      const startTaskIds = Array.from(start.taskIds);
      const index = startTaskIds.indexOf(card.id);
      startTaskIds.splice(index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };
      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(val.pos, 0, card.id);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };
      const newState = {
        ...columns,
        columnsData: {
          ...columns.columnsData,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      dispatch(setColumns(newState));
    }
  };

  const addList = () => {
    dispatch(setAddColumn(!addColumn));
  };

  const handleColumnName = (event) => {
    dispatch(setColumnName({ column: event.target.value }));
  };

  const addColumnDetails = (event) => {
    event.preventDefault();
    const columnid = uuidv4();
    const column = {
      id: `column${columnid}`,
      title: columnName.column,
      taskIds: [],
    };

    const columnList = columns.columnOrder;

    const newData = {
      ...columns,
      columnsData: {
        ...columns.columnsData,
        [column.id]: column,
      },
      columnOrder: [...columnList, column.id],
    };
    dispatch(setAddColumn(!addColumn));
    dispatch(setColumns(newData));
  };

  const deleteColumn = (columnid) => {
    const newColumns = columns.columnOrder.filter(
      (columnId) => columnid !== columnId
    );

    const newData = {
      ...columns,
      columnOrder: [...newColumns],
    };
    console.log("deleting column newData", newData);

    dispatch(setColumns(newData));
  };

  const editColumnTitle = (column) => {
    const newData = {
      ...columns,
      columnsData: {
        ...columns.columnsData,
        [column.id]: column,
      },
    };
    dispatch(setColumns(newData));
  };

  return (
    <div className="task-board">
      <Navbar />
      <Timeline />
      <div className="board">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className="sub-board"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {columns.columnOrder.map((columnValue, index) => {
                  let column = {};
                  const colId = Object.keys(columnValue)[0];
                  if (columns.columnsData[colId]) {
                    column = columns.columnsData[colId];
                  }
                  const taskArray = column.taskIds;
                  let tasks = [];
                  if (taskArray) {
                    tasks = taskArray.map((taskId) => columns.tasks[taskId]);
                  }
                  return (
                    <CardColumn
                      column={column}
                      key={column.id}
                      tasks={tasks}
                      index={index}
                      createCard={createCard}
                      removeCard={removeCard}
                      editCard={editCard}
                      data={columns}
                      moveCard={moveCard}
                      deleteColumn={deleteColumn}
                      editColumnTitle={editColumnTitle}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="add-another-list">
          <div
            className="add-list add-board"
            onClick={addList}
            style={{ display: !addColumn ? "inline-block" : "none" }}
          >
            <span className="plus-icon">+</span>
            <span>Add Another list</span>
          </div>
          <div
            className="textArea-add-list"
            style={{ display: addColumn ? "inline-block" : "none" }}
          >
            <form onSubmit={(event) => addColumnDetails(event)}>
              <input
                id="add-list-textarea"
                className="list-name-input"
                type="text"
                name="name"
                placeholder="Enter list title..."
                autoComplete="off"
                dir="auto"
                value={columnName.column}
                maxLength="512"
                onChange={handleColumnName}
              ></input>
              <button type="submit"> Add list</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
