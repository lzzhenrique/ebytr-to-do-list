import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import http from '../api/http';
import './style/editTask.css';

function EditTask({ task, attTasks }) {
  const token = localStorage.getItem('token');
  const [taskToEdit, setTaskToEdit] = useState({ ...task });
  const [disabledButton, setdisabledButton] = useState(true);

  useEffect(() => {
    const { title, description, deadline } = taskToEdit;

    if (title && description && deadline) return setdisabledButton(false);

    setdisabledButton(true);
  }, [taskToEdit]);

  const renderInputs = () => {
    const inputTitles = ['title', 'description', 'deadline'];

    return inputTitles.map((title, index) => {
      if (title === 'description') {
        return (
          <textarea
            key={ index }
            className="edit-task-input-description"
            name={ title }
            value={ taskToEdit[title] }
            onChange={ (e) => setTaskToEdit({ ...taskToEdit, [title]: e.target.value }) }
            placeholder={ `${title} of your task` }
          />
        );
      }

      return (
        <input
          key={ index }
          className="edit-task-input"
          name={ title }
          value={ taskToEdit[title] }
          onChange={ (e) => setTaskToEdit({ ...taskToEdit, [title]: e.target.value }) }
          type={ title === 'deadline' ? 'date' : 'text' }
          placeholder={ `${title} of your task here` }
        />
      );
    });
  };

  const renderOptions = () => {
    const statusOptions = ['pending', 'in progress', 'ready'];

    return statusOptions.map((option, index) => (
      <option value={ option } key={ index }>{option}</option>
    ));
  };

  const editTask = async () => {
    const createdAt = moment().format('YYYY-MM-DD');
    const { _id, ...taskToEditWithoutId } = taskToEdit;

    const taskWithCreatedAt = { ...taskToEditWithoutId, createdAt };

    await http.editTask({ token, task: taskWithCreatedAt, id: _id });

    attTasks();
    setEditMode(false);
  };

  return (
    <form
      className="form-edit-task"
    >
      <div
        className="edit-task-inputs"
      >
        { renderInputs() }
        <select
          className="task-select-edit-status"
          name="status"
          onChange={ (e) => setTaskToEdit({ ...taskToEdit, status: e.target.value }) }
        >
          { renderOptions() }
        </select>
      </div>
      <div
        className="edit-task-button-container"
      >
        <a href="#close" title="Close" className="close">
          <button
            type="button"
            className="edit-task-button"
            aria-label="Back to home button"
          >
            Back
          </button>
        </a>
        <button
          type="button"
          className="create-task-button"
          disabled={ disabledButton }
          onClick={ () => editTask() }
        >
          Edit
        </button>
      </div>
    </form>
  );
}

export default EditTask;

EditTask.propTypes = {
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
