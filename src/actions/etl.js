export const ETL = (columns) => {
  if (columns.length > 0) {
    let colOrder = [];
    let taskHolder = {};
    let taskArray = [];
    let colsData = {};
    columns.forEach((column) => {
      colOrder.push(column.column_order.toString());
    });
    columns.forEach((column) => {
      column.tasks.map((task) => {
        taskHolder[task.id] = { id: task.id.toString(), content: task.title };
        taskArray.push(task.id.toString());
      });
    });
    columns.forEach((column) => {
      let colData = {};
      const colId = column.id;
      colData["columnsData"] = {
        id: colId.toString(),
        title: column.title,
        tasksIds: taskArray,
      };
      colsData[[colId]] = colData;
    });
    let result = {};
    result["tasks"] = taskHolder;
    result["columnOrder"] = colOrder;
    result["columnsData"] = colsData;
    return result;
  }
  return {};
};
