import React, { useState, useEffect } from "react";
import PopUpModal from "../../components/modal/PopUpModal";
import "./Home.css";
import CardColumn from "../../containers/CardColumn/CardColumn";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { withError } from "../../containers/hoc/Hoc";
import {
  setColumns,
  setColumnName,
  setAddColumn,
  deleteColumnById,
  apiColumnCreate,
  triggerTogglePopUp,
} from "../../actions/columns";
import { apiTaskDelete, apiTaskStatusUpdate } from "../../actions/task";
import { initBoard } from "../../actions/board";

import Timeline from "../../react-life-timeline/Timeline";
import { useSelector, useDispatch } from "react-redux";
import Background from "../../components/background/background";
import MyWeekdayPicker from "../../components/button/WeekDayPicker";
import { useDidUpdate } from "../../components/utils";
import { useHistory } from "react-router-dom";
const BackgroundWithErrorHandling = withError(Background);

function Homepage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const columns = useSelector((state) => state.columns.columns);
  const addColumn = useSelector((state) => state.columns.addColumn);
  const columnName = useSelector((state) => state.columns.columnName);
  const error = useSelector((state) => state.columns.error);
  const events = useSelector((state) => state.events.events);
  const success = useSelector((state) => state.events.success);
  const boards = useSelector((state) => state.columns.boards);
  const title = useSelector((state) => state.tasks.values.title);
  const [week, setWeek] = useState(27);
  useEffect(() => {
    localStorage.getItem("token") && dispatch(initBoard());
  }, []);
  // useDidUpdate(() => {
  //   dispatch(initBoard());
  // }, [title]);
  const editCard = (card) => {
    const { id } = card;
    card["week"] = week;
    const newColumns = {
      ...columns,
      tasks: { ...columns.tasks, ["task" + id]: card },
    };
    dispatch(setColumns({ ...newColumns }));
  };

  const removeCard = (card, columnId) => {
    const { id } = card;
    const data = columns;
    data.columnsData["column" + columnId].taskIds = data.columnsData[
      "column" + columnId
    ].taskIds.filter((cardId) => id !== cardId);
    dispatch(apiTaskDelete(id, boards[0]));
    dispatch(setColumns({ ...data }));
  };

  const onDragEnd = (results) => {
    console.log("onDragEnd is triggered");
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
          ["column" + newColumn.id]: newColumn,
        },
      };
      dispatch(setColumns(newData));
      return;
    }

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    dispatch(
      apiTaskStatusUpdate(
        draggableId.slice(4, draggableId.length),
        newFinish.id,
        week,
        boards[0]
      )
    );
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
    dispatch(setColumns(newData));
    dispatch(apiColumnCreate(columnName.column, boards[0]));
    dispatch(setAddColumn(!addColumn));
  };

  const deleteColumn = (columnid) => {
    dispatch(deleteColumnById(columnid, boards[0]));
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
  const renderBoard = () => {
    return (
      <React.Fragment>
        <a href="#">
          <span onClick={toggleVisibility} className="close">
            &times;
          </span>
        </a>
        <div className="task-board">
          <h2>Week {week}</h2>
          {/* <MyWeekdayPicker /> */}
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
                    {columns.columnOrder &&
                      columns.columnOrder.map((columnValue, index) => {
                        let column = {};
                        const colId = Object.keys(columnValue)[0];
                        if (columns.columnsData[colId]) {
                          column = columns.columnsData[colId];
                        }
                        const taskArray = column.taskIds;
                        let tasks = [];
                        if (taskArray) {
                          taskArray.forEach((taskId) => {
                            tasks.push(columns.tasks[taskId]);
                          });
                        }
                        return (
                          <CardColumn
                            column={column}
                            key={column.id}
                            tasks={tasks.filter(
                              (task) => week == task.week || task.focus == true
                            )}
                            index={index}
                            removeCard={removeCard}
                            editCard={editCard}
                            data={columns}
                            moveCard={moveCard}
                            deleteColumn={deleteColumn}
                            editColumnTitle={editColumnTitle}
                            week={week}
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
      </React.Fragment>
    );
  };
  const toggleVisibility = (weekCounter) => {
    if (localStorage.getItem("token")) {
      dispatch(triggerTogglePopUp());
      weekCounter.currentTarget &&
        setWeek(weekCounter.currentTarget.getAttribute("weekvalue"));
    } else {
      history.push("/accounts/login");
    }
  };
  return (
    <React.Fragment>
      <BackgroundWithErrorHandling error={error} success={success}>
        <Timeline show={toggleVisibility} />
        <PopUpModal onClickAway={toggleVisibility}>
          {renderBoard(events)}
        </PopUpModal>
      </BackgroundWithErrorHandling>
    </React.Fragment>
  );
}

export default Homepage;
