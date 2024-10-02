import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthServices from '../../services/AuthServices';
import './Header.css';
import yinYang from '/assets/images/yin_yang.png';

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
      <div className="overlap-group" style={{ background: `linear-gradient(180deg, #383838 90%,  ${subtleColor} 100%)` }}>
          <div className="left-group">
            <img className="yin-yang" alt="Yin yang" src={yinYang} />
            <div className="div">Praecantatio Idle</div>
          </div>
          <div className="text-wrapper"  style={{ color: '#FFFFFF', textShadow: `0 0 2px ${textColor}, 0 0 5px ${textColor}, 0 0 10px ${textColor}` }}>Bem-vindo, {user ? user.displayName : 'Usuário'}</div>
          {user && <button className="button-exit" onClick={handleLogout}>Sair</button>}
        </div>
      </header>
    </div>
  );
};

export default Header;