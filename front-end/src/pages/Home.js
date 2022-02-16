import React, { useState, useEffect } from 'react';
import http from '../api/http';

function Home() {
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllTasks = async () => {
      const result = await http.getAllTasks();
      setUserTasks(result);
      setLoading(false);
    };
    getAllTasks();
  }, []);

  if (loading) return <h1>Carregando</h1>;

  return (
    <div>
      <h1>Ebytr</h1>
      <div className="header-controls">
        <button
          type="button"
        >
          Criar nova tarefa!
        </button>
      </div>
      <div className="tasks-container">
        {
          userTasks.map((task) => console.log(task))
        }
      </div>
    </div>
  );
}

export default Home;
