import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const Column = ({ column, updateTaskStatus }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "object",
    drop: () => {
      return { columnId: column.id };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return (
    <div key={column.id} className="flex flex-col">
      <div className={`${column.headerColor} rounded-t-xl p-4 shadow-lg`}>
        <h2 className="text-white font-semibold text-lg flex items-center justify-between">
          {column.title}
          <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
            {column.tasks.length}
          </span>
        </h2>
      </div>
      <div
        className={`${column.bgColor} rounded-b-xl min-h-96 p-4 shadow-lg border-2 border-gray-700`}
      >
        <div ref={drop} className="space-y-4">
          {column.tasks.length > 0 ? (
            column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={updateTaskStatus}
                availableStatuses={["TODO", "IN_PROGRESS", "DONE"]}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">📭</div>
              <p>No tasks yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Column;
