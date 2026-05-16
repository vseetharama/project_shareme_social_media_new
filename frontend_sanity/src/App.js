import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { Login } from './components';
import Home from './container/Home';

const App = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error('Failed to parse user:', e);
        localStorage.removeItem('user');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
    
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={user ? <Home user={user} /> : <Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
