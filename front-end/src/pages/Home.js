import React, { useState, useEffect } from 'react';
import { Task, TaskMaker } from '../components';

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

  if (loading) return <h1>Carregando</h1>;

  return (
    <div>
      <h1>Ebytr</h1>

      <div>
        <div className="task-maker-container">
          <TaskMaker />
        </div>
        <div className="tasks-container">
          {
            userTasks.map((taskInfo, index) => (
              <Task
                taskInfo={ taskInfo }
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
