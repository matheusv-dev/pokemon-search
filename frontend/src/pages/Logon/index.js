import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import { UserContext } from '../../context/UserContext';
import { Button, TextField } from '@mui/material';

export default function Logon() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setTokenUser, getFavorites } = useContext(UserContext);

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
      <section className="p-2">

        <form onSubmit={handleLogin} autoComplete='false' className='flex flex-col gap-2'>
          <TextField id="email"
            label="E-mail"
            variant="standard"
            className='w-full'
            name="email"
            placeholder="Seu e-mail"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete='off'
          />
          <TextField id="senha"
            label="Senha"
            variant="standard"
            className='w-full'
            name="senha"
            placeholder="Seu e-mail"
            required
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete='off'
          />

          <Button className="w-full" variant='contained' type="submit">Entrar</Button>

          <Link className="flex gap-2" to="/register">
            <FiLogIn size={16} color="#3498db" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
    </div>
  );
}