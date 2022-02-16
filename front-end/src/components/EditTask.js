import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import http from '../api/http';
import './style/editTask.css';

function EditTask({ task, attTasks, setEditMode }) {
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

    return inputTitles.map((title, index) => (
      <label
        htmlFor={ title }
        key={ index }
      >
        <input
          className="edit-task-input"
          name={ title }
          value={ taskToEdit[title] }
          onChange={ (e) => setTaskToEdit({ ...taskToEdit, [title]: e.target.value }) }
          type={ title === 'deadline' ? 'date' : 'text' }
          placeholder={ `${title} of your task here` }
        />
      </label>
    ));
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
    <form>
      { renderInputs() }
      <select
        className="edit-task-input"
        name="status"
        onChange={ (e) => setTaskToEdit({ ...taskToEdit, status: e.target.value }) }
      >
        { renderOptions() }
      </select>
      <button
        type="button"
        disabled={ disabledButton }
        onClick={ () => editTask() }
      >
        Confirm edit!
      </button>
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
  setEditMode: PropTypes.func.isRequired,
};
