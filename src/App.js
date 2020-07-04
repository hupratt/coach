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
  deleteColumnById,
  apiColumnCreate,
} from "./actions/columns";
import uuidv4 from "uuid/v4";
import { apiTaskDelete } from "./actions/task";
import { initBoard } from "./actions/board";

import Timeline from "./react-life-timeline/Timeline";
import { useSelector, useDispatch } from "react-redux";
import Background from "./components/background";

function App() {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columns.columns);
  const addColumn = useSelector((state) => state.columns.addColumn);
  const columnName = useSelector((state) => state.columns.columnName);

  useEffect(() => {
    login("admin", "admin");
  }, []);
  useEffect(() => {
    dispatch(initBoard());
  }, []);

  const editCard = (card) => {
    const { id } = card;
    const newColumns = {
      ...columns,
      tasks: { ...columns.tasks, ["task" + id]: card },
    };
    dispatch(setColumns({ ...newColumns }));
  };

  const createCard = (name, card, id) => {
    let newColumns = columns;
    newColumns.tasks[name] = card;
    newColumns.columnsData["column" + id].taskIds.push(name);
    dispatch(setColumns({ ...newColumns }));
  };

  const removeCard = (card, columnId) => {
    const { id } = card;
    dispatch(apiTaskDelete(id));
  };

  const onDragEnd = (results) => {
    console.log("onDragEnd is triggered");
    const { destination, source, draggableId, type } = results;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId == source.droppableId &&
      destination.index == source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(columns.columnOrder);
      const sourceIndex = source.index;
      newColumnOrder.splice(sourceIndex, 1);
      newColumnOrder.splice(destination.index, 0, {
        ["column" + draggableId]: columns.columnOrder[sourceIndex][
          "column" + draggableId
        ],
      });

      const newState = {
        ...columns,
        columnOrder: newColumnOrder,
      };
      dispatch(setColumns(newState));
      return;
    }

    const start = columns.columnsData["column" + source.droppableId];
    const finish = columns.columnsData["column" + destination.droppableId];

    if (start == finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, "column" + draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newData = {
        ...columns,

        columnsData: {
          ...columns.columnsData,
          ["column" + newColumn.id]: newColumn,
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
    finishTaskIds.splice(destination.index, 0, "task" + draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    console.log("start: from column", newStart);
    console.log("end: to column", newFinish);
    const newState = {
      ...columns,
      columnsData: {
        ...columns.columnsData,
        ["column" + newStart.id]: newStart,
        ["column" + newFinish.id]: newFinish,
      },
    };
    dispatch(setColumns(newState));
  };

  const moveCard = (card, column, previousposition, previousColumn, val) => {
    console.log("moving card");
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
      console.log("newTaskIds", newTaskIds);
      const index = newTaskIds.indexOf(card.id);
      newTaskIds.splice(index, 1);
      newTaskIds.splice(val.pos, 0, card.id);
      console.log("newTaskIds", newTaskIds);
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
      console.log("startTaskIds", startTaskIds);
      const index = startTaskIds.indexOf(card.id);
      startTaskIds.splice(index, 1);
      console.log("startTaskIds", startTaskIds);
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
    const columnList = columns.columnOrder;
    const maxOrderId = columns.maxOrderId;
    const column = {
      id: `${maxOrderId}`,
      title: columnName.column,
      taskIds: [],
    };

    const newObj = {
      ["column" + maxOrderId]: Number(maxOrderId + 1).toString(),
    };
    const newData = {
      ...columns,
      columnsData: {
        ...columns.columnsData,
        ["column" + maxOrderId]: column,
      },
      maxOrderId: maxOrderId + 1,
      columnOrder: [...columnList, newObj],
    };
    console.log("herreeeeee", newData);
    console.log("columnName.column", columnName.column);
    dispatch(setColumns(newData));
    dispatch(apiColumnCreate(columnName.column));
    dispatch(setAddColumn(!addColumn));
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

    dispatch(deleteColumnById(columnid));
  };

  const editColumnTitle = (column) => {
    const newData = {
      ...columns,
      columnsData: {
        ...columns.columnsData,
        [column.id]: column,
      },
    };
    console.log("newData", newData);
    dispatch(setColumns(newData));
  };
  console.log("columns.columnOrder", columns.columnOrder);
  return (
    <React.Fragment>
      {/* <Navbar /> */}
      <Background>
        <div className="task-board">
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
                        tasks = taskArray.map(
                          (taskId) => columns.tasks[taskId]
                        );
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
      </Background>
    </React.Fragment>
  );
}
export default App;
