import React, { useState, useEffect } from 'react';
import { Task, TaskMaker } from '../components';
import './style/home.css';

import http from '../api/http';

function Home() {
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const getAllTasks = async () => {
      const result = await http.getAllTasks(token);
      setUserTasks(result);
      setLoading(false);
    };
    getAllTasks();
  }, []);

  const orderByDate = () => {
    const order = userTasks.sort((a, b) => {
      const taskADate = new Date(a.createdAt);
      const taskBDate = new Date(b.createdAt);

      return taskADate - taskBDate;
    });
    setUserTasks([...order]);
  };

  const orderByAlpha = () => {
    const orderAlpha = userTasks.sort((a, b) => {
      const taskATitle = a.title.toLowerCase();
      const taskBTitle = b.title.toLowerCase();
      const LESS = -1;

      if (taskATitle < taskBTitle) return LESS;
      if (taskATitle > taskBTitle) return 1;
      return 0;
    });
    setUserTasks([...orderAlpha]);
  };

  const orderByStatus = () => {
    const order = userTasks.sort((a, b) => {
      const taskAStatus = a.status.toLowerCase();
      const taskBStatus = b.status.toLowerCase();
      const LESS = -1;

      if (taskAStatus < taskBStatus) return LESS;
      if (taskAStatus > taskBStatus) return 1;
      return 0;
    });
    setUserTasks([...order]);
  };

  const attTasks = async () => {
    const result = await http.getAllTasks(token);
    setUserTasks(result);
  };

  if (loading) return <h1>Carregando</h1>;

  return (
    <div className="home-container">
      <div className="header-container">
        <h1 className="title">Ebytr</h1>
      </div>
      <div className="sort-buttons-container">
        <button
          type="button"
          onClick={ () => orderByDate() }
          className="sort-button"
        >
          Creation
        </button>
        <button
          type="button"
          className="sort-button"
          onClick={ () => orderByAlpha() }
        >
          A-Z
        </button>
        <button
          type="button"
          className="sort-button"
          onClick={ () => orderByStatus() }
        >
          Status
        </button>
      </div>
      <a href="#modal">Create task</a>
      <div
        className="modal-container"
        id="modal"
      >
        <a href="#close" title="Close" className="close">x</a>
        <div className="task-maker-container">
          <TaskMaker
            attTasks={ attTasks }
          />
        </div>
      </div>
      <div className="tasks-container">
        {
          userTasks.map((task, index) => (
            <Task
              attTasks={ attTasks }
              task={ task }
              key={ index }
            />
          ))
        }
      </div>
    </div>
  );
}

export default Home;
