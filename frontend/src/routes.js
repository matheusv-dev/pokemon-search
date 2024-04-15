import React from 'react';
import { BrowserRouter, Route, Routes as RoutesContainer } from 'react-router-dom';
import Logon from './pages/Logon';
import Home from './pages/Home';
import { UserProvider } from './context/UserContext';

export default function Routes() {
  const token = localStorage.getItem('token') || ""

  return (
    <UserProvider tkn={token}>
      <BrowserRouter>
        <RoutesContainer>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' exact element={<Logon />} />
        </RoutesContainer>
      </BrowserRouter>
    </UserProvider>
  );
}