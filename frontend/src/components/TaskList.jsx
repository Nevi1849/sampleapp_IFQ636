
import { useState} from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskList = ({ tasks }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState({});
  const updateReview = (ideaId, field, value) => {
    setReviews(previous => ({
      ...previous,
      [ideaId]: {
        ...previous[ideaId],
        [field]: value
      }
    }));
  };

const saveReview = async (ideaId) => {
  try {
    const review = reviews[ideaId];

    const response = await axiosInstance.put(
      `/api/ideas/${ideaId}/review`,
      review,
      {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
  }
);

alert('Review saved successfully');
console.log('Saved review', response.data);

} catch (error) {
  console.error('Failed to save review', error)
  alert(error.response?.data?.message || 'Failed to save review');
}
};

  return (
    <div>
      {tasks.length === 0 &&(
        <p className="text-gray-500 p-4">
          No ideas match the selected filter.
        </p>
      )}

      {tasks.map((task) => (
        <div key={task._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{task.title}</h2>
          <p>Category: {task.category}</p>
          <p>
            Funding Target: {task.fundingTarget !=null
            ? `$${task.fundingTarget.toLocaleString('en-AU')}`
            : 'Not specified'}
          </p>
          <p className="text-sm text-gray-500">
            Status: {task.status}
          </p>
          {user?.role === 'Reviewer' && (
            <div className="mt-4 border-t pt-4">
              <h3 className="font-semibold mb-2">
                Review this idea
              </h3>
          <div className="mb-3">
            <label
              htmlFor={`innovation-${task._id}`}
              className="block mb-1"
            >
              Innovation score
            </label>

            <select
              id={`innovation-${task._id}`}
              className="p-2 border rounded"
              value={reviews[task._id]?.innovationScore ?? ''}
              onChange={(e) =>
                updateReview(task._id, 'innovationScore', Number(e.target.value))
              }
            >
            
              <option value="" disabled>Select a score</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="mb-3">
            <label
              htmlFor={`feasibility-${task._id}`}
              className="block mb-1"
            >
              Feasibility score
            </label>

            <select
               id={`feasibility-${task._id}`}
              className="p-2 border rounded"
              value={reviews[task._id]?.feasibilityScore ?? ''}
              onChange={(e) =>
                updateReview(task._id, 'feasibilityScore', Number(e.target.value))
              }
            >
              <option value="" disabled>Select a score</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="mb-3">
            <label
              htmlFor={`marketPotential-${task._id}`}
              className="block mb-1"
            >
              Market Potential score
            </label>

            <select
               id={`marketPotential-${task._id}`}
              className="p-2 border rounded"
              value={reviews[task._id]?.marketPotentialScore ?? ''}
              onChange={(e) =>
                updateReview(task._id, 'marketPotentialScore', Number(e.target.value))
              }
            >
              <option value="" disabled>Select a score</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="mb-3">
            <label
              htmlFor={`feedback-${task._id}`}
              className="block mb-1"
            >
              Reviewer feedback
            </label>
            <textarea
              id={`feedback-${task._id}`}
              className="p-2 border rounded"
              rows="3"
              value={reviews[task._id]?.reviewerFeedback ?? ''}
              onChange={(e) =>
                updateReview(task._id, 'reviewerFeedback', e.target.value)
              }
            />
          </div>
          
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-3 rounded"
            onClick={() =>saveReview(task._id)}
            >
              Save Review 
            </button>
          </div>

          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
