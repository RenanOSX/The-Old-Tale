import React from "react";

import { useNavigate } from 'react-router-dom';

import { useState } from "react";

import './TelaRecuperarSenha.css';

import AuthServices from "../../services/AuthServices";

import arrowLeft from '../../assets/icons/arrow_circle_left.png';

import circleRight from '../../assets/icons/arrow_circle_right.png';

const TelaGeracaoMundo = () => { 

    const [theme, setTheme] = useState('');
    const [themeFocused, setThemeFocused] = useState(false);

  return (
    <div className="geracaoMundo">
      <img
        className="arrow-circle-left"
        alt="Arrow circle left"
        src={arrowLeft}
        onClick={handleBackClick}
      />
      <div className="container-geracaoMundo">
        <div className="text-wrapper-2">RECUPERAR SENHA</div>
        
        <div className="input-group">
          <label className={`label ${themeFocused ? 'focused' : ''}`}>EMAIL</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setTheme(e.target.value)}
            onFocus={() => setThemeFocused(true)}
            onBlur={(e) => setThemeFocused(e.target.value !== '')}
          />
        </div>

        <img className="arrow-circle-right" alt="Arrow circle right"  src={circleRight} />
      </div>
    </div>
  );
};

export default TelaGeracaoMundo;