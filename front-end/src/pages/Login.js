import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../api/http';

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
    <div>
      <h1>Ebytr, sua todo list!</h1>
      <div className="login-div">
        <input
          name="email"
          type="text"
          placeholder="email"
          onChange={ (e) => handleChange(e.target) }
        />
        <input
          name="password"
          type="text"
          placeholder="password"
          onChange={ (e) => handleChange(e.target) }
        />
      </div>
      <button
        type="button"
        onClick={ () => navigate('/register') }
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
