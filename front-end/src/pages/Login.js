import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../api/http';

function Login() {
  // const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ password: '', email: '' });
  const [disabledButton, setdisabledButton] = useState(true);

  useEffect(() => {
    const { password, email } = loginData;

    if (password && email) setdisabledButton(false);

    setdisabledButton(true);
  }, [loginData]);

  function makeLogin() {
    const login = http.login(loginData);
    console.log(login);
  }

  function handleChange(name, value) {
    setLoginData({ ...loginData, [name]: value });
  }

  return (
    <div>
      <h1>Ebytr, sua todo list!</h1>
      <div className="login-div">
        <input
          name="email"
          type="text"
          placeholder="email"
          onChange={ (e) => handleChange(e.target.value) }
        />
        <input
          name="password"
          type="text"
          placeholder="password"
          onChange={ (e) => handleChange(e.target.value) }
        />
      </div>
      <button
        type="button"
      >
        Registrar-se
      </button>
      <button
        disabled={ disabledButton }
        onClick={ () => makeLogin() }
        type="button"
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
