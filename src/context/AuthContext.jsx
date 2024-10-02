import React, { createContext, useState, useEffect } from 'react';

import AuthServices from '../services/AuthServices';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    checkUser();
  }, []);

  const handleLogin = async (email, password) => {
    const response = await AuthServices.login(email, password);
    if (response.success) {
      setUser(response.user);
    }
    return response;
  };

  const handleSignup = async (email, password, name) => {
    const response = await AuthServices.register(email, password, name);
    if (response.success) {
      setUser(response.user);
    }
    return response;
  };

  const handleLogout = async () => {
    await AuthServices.logout();
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, handleSignup }}>
      {children}
    </AuthContext.Provider>
  );
};