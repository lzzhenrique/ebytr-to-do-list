import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import * as pages from '../pages';

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <pages.Login /> } />
      <Route path="/register" element={ <pages.Register /> } />
    </Routes>
  );
}

export default MainRoutes;
