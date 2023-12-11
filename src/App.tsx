import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './Form/Form';
import './App.css';
import Register from './Register/Register';
import Home from './Home/Home';
import { UserProvider } from './Context/UserContext';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [tokenChecked, setTokenChecked] = useState(false);

  const handleAuthentication = (newToken: string) => {
    console.log('Authentication successful. Token:', newToken);
    localStorage.setItem('token', newToken);
    setAuthenticated(true);
    setToken(newToken);
  };

  const handleLogout = () => {
    console.log('Logout. Removing token from localStorage.');
    localStorage.removeItem('token');
    setAuthenticated(false);
    setToken(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      console.log('Token found in localStorage. Authenticating...');
      setAuthenticated(true);
      setToken(storedToken);
    }
    // Indique que o token foi verificado
    setTokenChecked(true);
  }, []);

  console.log('Authenticated:', authenticated);
  console.log('Token:', token);

  return (
    <UserProvider>
      <Router>
        {tokenChecked ? (
          // Renderize as rotas apenas se o token foi verificado
          <Routes> 
            <Route
              path="/*"
              element={authenticated ? <Home handleLogout={handleLogout} /> : <Form handleAuthentication={handleAuthentication} />}
            />
            <Route path="/register" element={<Register />} />
          </Routes>
        ) : (
          // Renderize algo enquanto o token está sendo verificado
          <div>Verificando autenticação...</div>
        )}
      </Router>
    </UserProvider>
  );
};

export default App;
