import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const { user } = useAuth();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ 
    title: '',
    category: '',
    problem: '',
    solution: '',
    targetMarket: '',
    fundingTarget: ''
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        category: editingTask.category || '',
        problem: editingTask.problem || '',
        solution: editingTask.solution || '',
        targetMarket: editingTask.targetMarket || '',
        fundingTarget: editingTask.fundingTarget ?? '',
        
      });
    } else {
      setFormData({ 
        title: '',
        category: '',
        problem: '',
        solution: '',
        targetMarket: '',
        fundingTarget: ''
      });
    }
  }, [editingTask]);
 
  const handleSubmit = async (e, action = 'submit') => {
    e.preventDefault();

    const newErrors = {}

    if (action === 'submit') {

      if (!formData.title.trim()) {
        newErrors.title = 'Title is required';
      }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
     if (!formData.problem.trim()) {
      newErrors.problem = 'Problem is required';
    }
    
     if (!formData.solution.trim()) {
      newErrors.solution = 'Solution is required';
    }
    
     if (!formData.targetMarket.trim()) {
      newErrors.targetMarket = 'Target Market is required';
    }
    
    if (formData.fundingTarget.trim() === '' ||
        Number(formData.fundingTarget) <= 0) {
      newErrors.fundingTarget = 'Funding Target must be greater than zero.';
    }
  }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    } 

    try {
        const response = await axiosInstance.post(
          '/api/ideas',
          { ...formData,
          fundingTarget: formData.fundingTarget=== ''
          ? null
          : Number(formData.fundingTarget),
          action},
          {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks([...tasks, response.data]);
      setEditingTask(null);
      setFormData({
        title: '',
        category: '',
        problem: '',
        solution: '',
        targetMarket: '',
        fundingTarget: ''
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to save idea.';
      alert(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">
        Submit a Startup Idea
      </h1>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      {errors.title && (
        <p className="text-red-600 text-sm mb-2">
          {errors.title}
        </p>
      )}
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        />
        {errors.category && (
        <p className="text-red-600 text-sm mb-2">
          {errors.category}
        </p>
      )}
      <textarea
        placeholder="What problem does your startup solve?"
        value={formData.problem}
        onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        rows="4"
      />
      {errors.problem && (
        <p className="text-red-600 text-sm mb-2">
          {errors.problem}
        </p>
      )}
      <textarea
        placeholder="How will your startup idea solve this problem?"
        value={formData.solution}
        onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        rows="4"
      />
      {errors.solution && (
        <p className="text-red-600 text-sm mb-2">
          {errors.solution}
        </p>
      )}
      <textarea
        placeholder="Who is your target market?"
        value={formData.targetMarket}
        onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        rows="3"
      />
      {errors.targetMarket && (
        <p className="text-red-600 text-sm mb-2">
          {errors.targetMarket}
        </p>
      )}
      <input
        type="number"
        placeholder="Funding Target $"
        value={formData.fundingTarget}
        onChange={(e) => setFormData({ ...formData, fundingTarget: e.target.value })}
        min="1"
        step="1"
        className="w-full mb-4 p-2 border rounded"
      />
      {errors.fundingTarget && (
        <p className="text-red-600 text-sm mb-2">
          {errors.fundingTarget}
        </p>
      )}
      <button
       type="button"
       onClick={(e) => handleSubmit(e, 'saveDraft')}
       className="w-full bg-blue-600 text-white p-2 rounded"
       >
        Save Draft
      </button>
      <button
       type="submit" 
       className="w-full bg-blue-600 text-white p-2 rounded"
       >
        Submit Idea
      </button>
    </form>
  );
};

export default TaskForm;
