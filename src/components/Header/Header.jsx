import React from "react";

import { useNavigate } from 'react-router-dom';

import AuthServices from '../../services/AuthServices';

import './Header.css';

import logo from '/assets/icons/logo.png';

import crown from '/assets/icons/border-header.png'

import stars from '/assets/icons/stars.png';

const Header = ({ user, color, textColor }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await AuthServices.logout();
    if (result.success) {
      navigate('/'); 
      window.location.reload(); 
    } else {
      console.error("Failed to log out:", result.error);
    }
  };

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const subtleColor = hexToRgba(color, 0.5);

  return (
    <div className="box">
      <header className="header">
        {/* <img className="crown" alt="Crown" src={crown} /> {/* Adicione a imagem da coroa */}
        <div className="left-group">
          <img className="stars" alt="Stars" src={stars} />
          <img className="logo" alt="logo" src={logo} />
        </div>
        <div className="text-wrapper"  style={{ color: '#FFFFFF', textShadow: `0 0 0.01rem ${textColor}, 0 0 0.1rem ${textColor}, 0 0 0.2rem ${textColor}` }}>Bem-vindo, {user ? user.displayName : 'Usuário'}</div>
        {user && <button className="button-exit" onClick={handleLogout}>Sair</button>}
      </header>
    </div>
  );
};

export default Header;