import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthServices from '../../services/AuthServices';
import './Header.css';
import yinYang from '../../assets/images/yin_yang.png';

const Header = ({ user, color }) => {
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

  return (
    <div className="box">
      <header className="header">
        <div className="overlap-group" style={{ backgroundColor: color }}>
          <div className="left-group">
            <img className="yin-yang" alt="Yin yang" src={yinYang} />
            <div className="div">Praecantatio Idle</div>
          </div>
          <div className="text-wrapper">Bem-vindo, {user ? user.displayName : 'Usuário'}</div>
          {user && <button className="button-exit" onClick={handleLogout}>Sair</button>}
        </div>
      </header>
    </div>
  );
};

export default Header;