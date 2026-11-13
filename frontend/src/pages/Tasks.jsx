import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    if (!user) return;
    
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/api/ideas', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch ideas:', error);
        alert('Failed to fetch ideas.');
      }
    };

    fetchTasks();
  }, [user]);

  const filteredTasks = statusFilter === 'All'
    ? tasks
    : tasks.filter(task => task.status === statusFilter);

  return (
    <div className="container mx-auto p-6">
      {user?.role === 'Founder' && (
      <TaskForm
        tasks={tasks}
        setTasks={setTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
      )}
      
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">
        Filter by status:
      </label>

      <select
        id="statusFilter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="All">All</option>
        <option value="Draft">Draft</option>
        <option value="Submitted">Submitted</option>
        <option value="Under Review">Under Review</option>
        <option value="Approved">Approved</option>
        <option value="Revision Needed">Revision Needed</option>
        <option value="Rejected">Rejected</option>
      </select>

      </div>

      <TaskList tasks={filteredTasks} setTasks={setTasks} setEditingTask={setEditingTask} />
    </div>
  );
};

export default Tasks;
