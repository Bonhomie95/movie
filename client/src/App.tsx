import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrowseAllPage from './pages/BrowseAllPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/browse" element={<BrowseAllPage />} />
    </Routes>
  );
}

export default App;
