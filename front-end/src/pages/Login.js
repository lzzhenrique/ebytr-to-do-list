import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../api/http';
import './style/login.css';

const PASSWORD_MIN_LENGTH = 8;

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ password: '', email: '' });
  const [disabledButton, setdisabledButton] = useState(true);

  useEffect(() => {
    const { password, email } = loginData;

    if (password.length < PASSWORD_MIN_LENGTH) return setdisabledButton(true);
    if (password && email) return setdisabledButton(false);

    setdisabledButton(true);
  }, [loginData]);

  async function makeLogin() {
    const login = await http.login(loginData);

    if ('token' in login) {
      localStorage.setItem('token', login.token);
      navigate('/home');
    }
  }

  function handleChange({ name, value }) {
    setLoginData({ ...loginData, [name]: value });
  }

  return (
    <div className="login-container">
      <h1>Ebytr, sua todo list!</h1>
      <div className="login-div">
        <input
          className="login-input"
          name="email"
          type="text"
          placeholder="Email"
          onChange={ (e) => handleChange(e.target) }
        />
        <input
          className="login-input"
          name="password"
          type="text"
          placeholder="Password"
          onChange={ (e) => handleChange(e.target) }
        />
      </div>
      <div className="login-buttons">
        <button
          className="login-button"
          disabled={ disabledButton }
          onClick={ () => makeLogin() }
          type="button"
        >
          Entrar
        </button>
        <button
          className="login-button"
          type="button"
          onClick={ () => navigate('/register') }
        >
          Registrar-se
        </button>
      </div>
    </div>
  );
}

export default Login;
