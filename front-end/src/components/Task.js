import React from 'react';
import PropTypes from 'prop-types';
import http from '../api/http';

function Task(
  { task: { createdAt, deadline, description, status, title, _id: id }, attTasks },
) {
  console.log(attTasks);
  const token = localStorage.getItem('token');

  const deleteTask = async () => {
    await http.deleteTask({ token, id });
    console.log(attTasks);
    attTasks();
  };

  return (
    <div
      id={ id }
      className="task-card"
    >
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{createdAt}</p>
      <p>{deadline}</p>
      <p>{status}</p>
      <div className="task-buttons" />
      <button
        type="button"
      >
        Edit Task
      </button>
      <button
        type="button"
        onClick={ () => deleteTask() }
      >
        Remove Task
      </button>
    </div>
  );
}

export default Task;

Task.propTypes = {
  task: PropTypes.shape({
    createdAt: PropTypes.string,
    deadline: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  attTasks: PropTypes.func.isRequired,
};

// userId: "620ce1b3f6ec01ddb49ede2e"
