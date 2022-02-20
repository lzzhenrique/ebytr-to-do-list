import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task, TaskMaker } from '../components';
import './style/home.css';

import http from '../api/http';
import sortFuncs from '../helpers/sortTasks';
import USER_UNAUTHORIZED from '../helpers/apiErrors';

function Home() {
  const navigate = useNavigate();
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    const getAllTasks = async () => {
      const result = await http.getAllTasks(token);
      if (result === USER_UNAUTHORIZED || !token) return navigate('/login');
      setUserTasks(result);
      setLoading(false);
    };
    getAllTasks();
  }, []);

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
          onClick={ () => sortFuncs.date(userTasks, setUserTasks) }
          className="sort-button"
        >
          Date
        </button>
        <button
          type="button"
          className="sort-button"
          onClick={ () => sortFuncs.alpha(userTasks, setUserTasks) }
        >
          A-Z
        </button>
        <button
          type="button"
          className="sort-button"
          onClick={ () => sortFuncs.status(userTasks, setUserTasks) }
        >
          Status
        </button>
      </div>
      <div className="call-modal-container">
        <a className="call-modal" href="#modal">
          <button
            type="button"
            className="call-modal-button"
            aria-label="Back to home button"
          >
            Create Task!
          </button>
        </a>
      </div>
      <div
        className="modal-container"
        id="modal"
      >
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
