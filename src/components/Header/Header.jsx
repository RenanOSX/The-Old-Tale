import React, { useEffect, useState } from "react";

import './Header.css';

import yinYang from '../../assets/images/yin_yang.png';

const Header = ({user}) => {
  return (
    <div className="box">
      <header className="header">
        <div className="overlap-group">
          <div className="left-group">
            <img className="yin-yang" alt="Yin yang" src={yinYang} />
            <div className="div">Praecantatio Idle</div>
          </div>
          <div className="text-wrapper">Bem-vindo, {user ? user.displayName : 'Usuário'}</div>
        </div>
      </header>
    </div>
  );
};

export default Header;