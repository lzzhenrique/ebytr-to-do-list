import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditTask from './EditTask';
import http from '../api/http';

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
        onClick={ () => deleteTask() }
      >
        Remove Task
      </button>
      <button
        type="button"
        onClick={ () => setEditMode(true) }
      >
        Edit Task
      </button>
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
