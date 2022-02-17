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
    <div>
      <div className="name-container">
        <h1 className="name">Ebytr</h1>
      </div>
      <div>
        <div className="subtitle">
          <h2>Add your task here!</h2>
        </div>
        <div className="task-maker-container">
          <TaskMaker
            attTasks={ attTasks }
          />
        </div>
        <div className="sort-buttons-container">
          <h3>Order your tasks!</h3>
          <button
            type="button"
            onClick={ () => orderByDate() }
          >
            Creation
          </button>
          <button
            type="button"
            onClick={ () => orderByAlpha() }
          >
            Alphabetically
          </button>
          <button
            type="button"
            onClick={ () => orderByStatus() }
          >
            Status
          </button>

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
    </div>
  );
}

export default Home;
