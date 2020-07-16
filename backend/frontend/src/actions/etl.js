const buildColumnOrder = (columns) => {
  let colOrder = [];
  let maxOrderId;
  columns.forEach((column) => {
    const colId = `column${column.id}`;
    const colOrderId = `${column.column_order.toString()}`;
    let i = 0;
    if (colOrder.length > 0) {
      while (i < colOrder.length) {
        const lastOrderedObj = Object.keys(colOrder)[colOrder.length - 1];
        const val = Object.values(colOrder[lastOrderedObj])[0];
        if (column.column_order < val) {
          console.log(
            `${column.column_order} < ${val} column.column_order < val so splicing the colOrder array at index ${i}`
          );
          colOrder.splice(i, 0, {
            [colId]: colOrderId,
          });
          maxOrderId = colOrderId;
        }
        if (column.column_order > val) {
          console.log(
            `${column.column_order} > ${val} column.column_order > val so pushing col to the end of the colOrder array`
          );
          colOrder.push({
            [colId]: colOrderId,
          });
          maxOrderId = colOrderId;
        }
        i++;
      }
    } else {
      console.log("colOrder is empty, adding the val", {
        [colId]: colOrderId,
      });
      colOrder.push({ [colId]: colOrderId });
      maxOrderId = colOrderId;
    }
  });
  return [colOrder, maxOrderId];
};
const buildColumnsData = (column, taskArray) => {
  let colsData = {};
  const colId = `column${column.id}`;
  const colData = {
    id: column.id.toString(),
    title: column.title,
    taskIds: taskArray,
  };
  colsData[[colId]] = colData;
  return [colData, colsData];
};
const buildTasks = (tasks) => {
  let taskArray = [];
  let taskHolder = {};
  tasks.forEach((task) => {
    taskArray.push(`task${task.id}`);
    taskHolder[`task${task.id}`] = {
      id: task.id.toString(),
      content: task.title,
      weeks: task.events_in_week,
      week: task.week,
    };
  });
  return [taskArray, taskHolder];
};

const buildColsAndTasksHolder = (columns) => {
  let tasksHolder = {};
  let colsData = {};
  columns.forEach((column) => {
    const [taskArray, taskHolderObj] = buildTasks(column.tasks);
    tasksHolder = { ...tasksHolder, ...taskHolderObj };

    const [colData, colsDataObj] = buildColumnsData(column, taskArray);
    colsData = { ...colsData, ...colsDataObj };
  });
  return [tasksHolder, colsData];
};
export const transform = (columns) => {
  if (columns.length > 0) {
    const [tasksHolder, colsData] = buildColsAndTasksHolder(columns);
    const [colOrder, maxOrderId] = buildColumnOrder(columns);
    return {
      tasks: tasksHolder,
      columnOrder: colOrder,
      columnsData: colsData,
      maxOrderId: Number(maxOrderId),
    };
  }
  return {};
};
