import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import AuthServices from './services/AuthServices';

import TelaInicial from './pages/TelaInicial/Telainicial';

import TelaPrincipal from './pages/TelaPrincipal/TelaPrincipal';

import TelaCadastro from './pages/TelaCadastro/TelaCadastro';

import TelaRecuperarSenha from './pages/TelaRecuperarSenha/TelaRecuperarSenha';

import TelaGeracaoMundo from './pages/TelaGeracaoMundo/TelaGeracaoMundo';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = AuthServices.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    AuthServices.logout();
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/telaPrincipal" /> : <TelaInicial onLogin={handleLogin} />} />
        <Route path='/telaInicial' element={<TelaInicial onLogin={handleLogin} />} />
        <Route path="/telaPrincipal" element={user ? <TelaPrincipal onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/cadastro" element={<TelaCadastro />} />
        <Route path="/recuperarSenha" element={<TelaRecuperarSenha />} />
        <Route path="/geracaoMundo" element={<TelaGeracaoMundo />} />
      </Routes>
    </Router>
  );
};

export default App;