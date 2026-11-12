
const TaskList = ({ tasks }) => {

  return (
    <div>
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
        </div>
      ))}
    </div>
  );
};

export default TaskList;
