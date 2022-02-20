import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import http from '../api/http';
import './style/taskMaker.css';

function TaskMaker({ attTasks }) {
  const token = localStorage.getItem('token');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    status: 'pending',
  });
  const [disabledButton, setdisabledButton] = useState(true);

  useEffect(() => {
    const { title, description, deadline } = newTask;

    if (title && description && deadline) return setdisabledButton(false);

    setdisabledButton(true);
  }, [newTask]);

  const newTaskHandler = ({ name, value }) => {
    setNewTask({ ...newTask, [name]: value });
  };

  const renderInputs = () => {
    const inputTitles = ['title', 'deadline', 'description'];

    return inputTitles.map((title, index) => {
      if (title === 'description') {
        return (
          <textarea
            className="task-input-description"
            name={ title }
            onChange={ (e) => newTaskHandler(e.target) }
            placeholder={ `${title} of your task` }
          />
        );
      }

      return (
        <input
          key={ index }
          className="task-input"
          name={ title }
          onChange={ (e) => newTaskHandler(e.target) }
          type={ title === 'deadline' ? 'date' : 'text' }
          placeholder={ `${title} of your task` }
        />
      );
    });
  };

  const renderOptions = () => {
    const statusOptions = ['Pending', 'In progress', 'Ready'];

    return statusOptions.map((option, index) => (
      <option
        className="task-input-select-option"
        value={ option }
        key={ index }
      >
        {option}
      </option>
    ));
  };

  const createTask = async () => {
    const createdAt = moment().format('YYYY-MM-DD');
    const taskWithCreatedAt = { ...newTask, createdAt };

    await http.createTask({ token, taskWithCreatedAt });

    attTasks();
  };

  return (
    <form
      className="form-task"
    >
      <div
        className="task-inputs"
      >
        { renderInputs() }
        <select
          className="task-select-status"
          name="status"
          onChange={ (e) => newTaskHandler(e.target) }
        >
          { renderOptions() }
        </select>
      </div>
      <div
        className="create-task-button-container"
      >
        <a href="#close" title="Close" className="close">
          <button
            type="button"
            className="create-task-button"
            aria-label="Back to home button"
          >
            Back
          </button>
        </a>
        <button
          type="button"
          className="create-task-button"
          disabled={ disabledButton }
          onClick={ () => createTask() }
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default TaskMaker;

TaskMaker.propTypes = {
  attTasks: PropTypes.func.isRequired,
};
