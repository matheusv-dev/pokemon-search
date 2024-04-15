import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import { UserContext } from '../../context/UserContext';

export default function Logon() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, setTokenUser } = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('api/login', { email, password });

      localStorage.setItem('token', response.data.token);
      setTokenUser(response.data.token)
    } catch (err) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">

        <form onSubmit={handleLogin}>
          <input

            placeholder="Seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Sua Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#3498db" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
    </div>
  );
}