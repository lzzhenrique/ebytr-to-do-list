import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditTask from './EditTask';
import http from '../api/http';
import './style/task.css';

function Task(
  { task: { createdAt, deadline, description, status, title, _id: id }, attTasks },
) {
  const token = localStorage.getItem('token');

  const [task] = useState({
    createdAt,
    deadline,
    description,
    status,
    title,
    _id: id,
  });

  const deleteTask = async () => {
    await http.deleteTask({ token, id });
    attTasks();
  };

  return (
    <div
      id={ id }
      className="task-card"
    >
      <div
        className="task-info"
      />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{`Created at: ${createdAt}`}</p>
      <p>{`Due date: ${deadline}`}</p>
      <p>{`Status: ${status}`}</p>
      <div className="task-buttons">
        <button
          className="manage-task-button"
          type="button"
          onClick={ () => deleteTask() }
        >
          Remove
        </button>
        <a href={ `#edit-task${id}` }>
          <button
            aria-label="Edit task button"
            className="manage-task-button"
            type="button"
          >
            Edit
          </button>
        </a>
      </div>
      <div id={ `edit-task${id}` } className="edit-modal-container">
        <div className="edit-task-container">
          <EditTask
            task={ task }
            attTasks={ attTasks }
          />
        </div>
      </div>
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
