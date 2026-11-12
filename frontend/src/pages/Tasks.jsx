import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

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

  return (
    <div className="container mx-auto p-6">
      <TaskForm
        tasks={tasks}
        setTasks={setTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
      <TaskList tasks={tasks} setTasks={setTasks} setEditingTask={setEditingTask} />
    </div>
  );
};

export default Tasks;
