import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../api/http';
import './style/register.css';

const CONFLICT = 409;
const PASSWORD_MIN_LENGTH = 8;
const NAME_MIN_LENGTH = 3;

function Register() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({ password: '', email: '', name: '' });
  const [emailAlreadExists, setEmailAlreadyExists] = useState(false);
  const [disabledButton, setdisabledButton] = useState(true);

  useEffect(() => {
    const { password, email, name } = registerData;

    if (password.length < PASSWORD_MIN_LENGTH) return setdisabledButton(true);
    if (name.length < NAME_MIN_LENGTH) return setdisabledButton(true);

    if (password && email && name) return setdisabledButton(false);

    setdisabledButton(true);
  }, [registerData]);

  async function registerUser() {
    const register = await http.createUser(registerData);

    if (register === CONFLICT) return setEmailAlreadyExists(true);

    setEmailAlreadyExists(false);
    navigate('/login');
  }

  function handleChange({ name, value }) {
    setRegisterData({ ...registerData, [name]: value });
  }

  return (
    <div className="register-container">
      <h1 className="title-register">Sign up</h1>
      <form className="register-div">
        <input
          className="register-input"
          name="name"
          type="text"
          placeholder="Choose a username"
          onChange={ (e) => handleChange(e.target) }
        />
        <input
          className="register-input"
          name="email"
          type="text"
          placeholder="Email"
          onChange={ (e) => handleChange(e.target) }
        />
        {
          emailAlreadExists ? <span>Esse e-mail já existe!</span> : ''
        }
        <input
          className="register-input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={ (e) => handleChange(e.target) }
        />
      </form>
      <div className="title-container">
        <button
          className="register-button"
          onClick={ () => navigate('/login') }
          type="button"
        >
          Back
        </button>
        <button
          className="register-button"
          disabled={ disabledButton }
          onClick={ () => registerUser() }
          type="button"
        >
          Sign-up
        </button>
      </div>
    </div>
  );
}

export default Register;
