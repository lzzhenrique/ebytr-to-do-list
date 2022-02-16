import React, { useState } from 'react';
import moment from 'moment';
import http from '../api/http';

function TaskMaker() {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    status: 'pending',
  });
  const token = localStorage.getItem('token');

  const newTaskHandler = ({ name, value }) => {
    setNewTask({ ...newTask, [name]: value });
  };

  const renderInputs = () => {
    const inputTitles = ['title', 'description', 'deadline'];

    return inputTitles.map((title, index) => (
      <label
        htmlFor={ title }
        key={ index }
      >
        <input
          name={ title }
          onChange={ (e) => newTaskHandler(e.target) }
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

  const createTask = async () => {
    const createdAt = moment().format('YYYY-MM-DD');
    const taskWithCreatedAt = { ...newTask, createdAt };

    await http.createTask({ token, taskWithCreatedAt });
  };

  return (
    <form>
      { renderInputs() }
      <select
        name="status"
        onChange={ (e) => newTaskHandler(e.target) }
      >
        { renderOptions() }
      </select>
      <button
        type="button"
        onClick={ () => createTask() }
      >
        Add your task!
      </button>
    </form>
  );
}

export default TaskMaker;
