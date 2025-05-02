import React from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import Layout from './pages/Layout';
import HomePage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
// import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
