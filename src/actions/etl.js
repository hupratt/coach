const buildColumnOrder = (columns) => {
  let colOrder = [];
  columns.forEach((column) => {
    colOrder.push(column.column_order.toString());
  });
  return colOrder;
};
const buildColumnsData = (column, taskArray) => {
  let colsData = {};
  const colId = column.id;
  const colData = {
    id: column.id.toString(),
    title: column.title,
    tasksIds: taskArray,
  };
  colsData[[colId]] = colData;
  return [colData, colsData];
};
const buildTasks = (tasks) => {
  let taskArray = [];
  let taskHolder = {};
  tasks.map((task) => {
    taskArray.push(task.id.toString());
    taskHolder[task.id] = { id: task.id.toString(), content: task.title };
  });
  return [taskArray, taskHolder];
};

const buildColsAndTasksHolder = (columns) => {
  let tasksHolder = {};
  let colsData = {};
  columns.forEach((column) => {
    const [taskArray, taskHolderObj] = buildTasks(column.tasks);
    tasksHolder = { ...taskHolderObj, ...tasksHolder };

    const [colData, colsDataObj] = buildColumnsData(column, taskArray);
    colsData = { ...colsData, ...colsDataObj };
  });
  return [tasksHolder, colsData];
};
export const transform = (columns) => {
  if (columns.length > 0) {
    const [tasksHolder, colsData] = buildColsAndTasksHolder(columns);
    return {
      tasks: tasksHolder,
      columnOrder: buildColumnOrder(columns),
      columnsData: colsData,
    };
  }
  return {};
};
