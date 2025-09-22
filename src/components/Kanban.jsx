import { useState, useEffect } from 'react';
import tasksData from '../data/task.json';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';

const Kanban = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    setTasks(tasksData);
  }, []);

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const addNewTask = (newTask) => {
    const task = {
      id: (Math.max(...tasks.map(t => parseInt(t.id))) + 1).toString(),
      ...newTask,
      createdAt: new Date().toISOString()
    };
    setTasks(prevTasks => [...prevTasks, task]);
    setIsAddModalOpen(false);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const columns = [
    {
      id: 'TODO',
      title: '📋 To Do',
      tasks: getTasksByStatus('TODO'),
      bgColor: 'bg-slate-800',
      headerColor: 'bg-red-500'
    },
    {
      id: 'IN_PROGRESS',
      title: '⚡ In Progress',
      tasks: getTasksByStatus('IN_PROGRESS'),
      bgColor: 'bg-slate-800',
      headerColor: 'bg-yellow-500'
    },
    {
      id: 'DONE',
      title: '✅ Done',
      tasks: getTasksByStatus('DONE'),
      bgColor: 'bg-slate-800',
      headerColor: 'bg-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div></div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              🚀 Project Kanban Board
            </h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg font-semibold text-sm"
            >
              + Add Task
            </button>
          </div>
          <p className="text-gray-400 text-lg">Organize your tasks and boost productivity</p>
          <div className="mt-4 flex justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>{getTasksByStatus('TODO').length} To Do</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>{getTasksByStatus('IN_PROGRESS').length} In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>{getTasksByStatus('DONE').length} Done</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="flex flex-col">
              <div className={`${column.headerColor} rounded-t-xl p-4 shadow-lg`}>
                <h2 className="text-white font-semibold text-lg flex items-center justify-between">
                  {column.title}
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                    {column.tasks.length}
                  </span>
                </h2>
              </div>
              <div className={`${column.bgColor} rounded-b-xl min-h-96 p-4 shadow-lg border-2 border-gray-700`}>
                <div className="space-y-4">
                  {column.tasks.length > 0 ? (
                    column.tasks.map((task) => (
                      <TaskCard 
                        key={task.id} 
                        task={task} 
                        onStatusChange={updateTaskStatus}
                        availableStatuses={['TODO', 'IN_PROGRESS', 'DONE']}
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
          ))}
        </div>
      </div>
      
      {/* Add Task Modal */}
      {isAddModalOpen && (
        <AddTaskModal 
          onClose={() => setIsAddModalOpen(false)}
          onAdd={addNewTask}
        />
      )}
    </div>
  );
};

export default Kanban;
