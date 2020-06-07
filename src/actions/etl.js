export const ETL = (columns) => {
  if (columns.length > 0) {
    let colOrder = [];
    let taskHolder = {};
    let colsData = {};
    columns.forEach((column) => {
      colOrder.push(column.column_order.toString());
    });
    columns.forEach((column) => {
      let taskArray = [];
      column.tasks.map((task) => {
        taskArray.push(task.id.toString());
        taskHolder[task.id] = { id: task.id.toString(), content: task.title };
      });
      const colId = column.id;
      const colData = {
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
