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
  const [editMode, setEditMode] = useState(false);

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
          type="button"
          onClick={ () => deleteTask() }
        >
          Remove Task
        </button>
        <button
          type="button"
          onClick={ () => setEditMode(!editMode) }
        >
          Edit task
        </button>
      </div>
      {
        editMode ? (
          <EditTask
            task={ task }
            attTasks={ attTasks }
            setEditMode={ setEditMode }
          />
        ) : ''
      }
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
