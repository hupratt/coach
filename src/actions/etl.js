export const ETL = (columns) => {
  if (columns.length > 0) {
    let result = [];
    let colOrder = [];
    columns.forEach((column) => {
      colOrder.push(column.column_order);
    });
    columns.forEach((column) => {
      let colData = {};
      const colId = column.id;
      let data = { id: colId, title: column.title };
      let taskHolder = {};
      column.tasks.map((task) => {
        taskHolder[task.id] = { id: task.id, content: task.title };
      });
      data["tasks"] = taskHolder;
      colData["tasks"] = data;
      colData["columnOrder"] = colOrder;
      colData["columnsData"] = {
        id: colId,
        title: column.title,
        [colId]: taskHolder,
      };
      result.push(colData);
    });
    return result;
  }
  return [];
};
