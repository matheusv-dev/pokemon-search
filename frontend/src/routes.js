import React from 'react';
import { BrowserRouter, Route, Routes as RoutesContainer } from 'react-router-dom';
import Logon from './pages/Logon';

export default function Routes() {
  return (
    <BrowserRouter>
      <RoutesContainer>
        <Route path='/' exact element={<Logon />} />
      </RoutesContainer>
    </BrowserRouter>
  );
}