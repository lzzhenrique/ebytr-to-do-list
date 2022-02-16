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
        <div className="tasks-container">
          {
            userTasks.map((task, index) => (
              <Task
                attTasks={ attTasks }
                task={ task }
                key={ index }
                a={ index }
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
