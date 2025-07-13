import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Shopping from './pages/shopping';
import CheckOut from './pages/checkout';
import Admin from './pages/admin';
import Login from './pages/login'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isAdminLoggedIn') === 'true';
  });

  useEffect(() => {
    sessionStorage.setItem('isAdminLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Shopping />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        <Route
          path="/admin"
          element={isLoggedIn ? <Admin setIsLoggedIn={setIsLoggedIn}/> : <Navigate to="/login" replace />}
        />

        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
