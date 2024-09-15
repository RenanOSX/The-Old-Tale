import React from "react";

import { useNavigate } from 'react-router-dom';

import { useState } from "react";

import AuthServices from "../../services/AuthServices";

import './TelaGeracaoMundo.css';

import arrowLeft from '../../assets/icons/arrow_circle_left.png';

import circleRight from '../../assets/icons/arrow_circle_right.png';

const TelaGeracaoMundo = () => { 
  const navigate = useNavigate();
  
  const [theme, setTheme] = useState('');

  const [themeFocused, setThemeFocused] = useState(false);

  const handleBackClick = () => {
    navigate('/telaInicial');
  };

  const handleSubmit = async () => {
    const currentUser = await AuthServices.getCurrentUser();

    if (currentUser) {
      currentUser.theme = theme;
      await AuthServices.updateUser(currentUser);

      navigate('/telaPrincipal');
    } else {
      console.error('Usuário não autenticado');
    }
  }

  return (
    <div className="geracaoMundo">
      <img
        className="arrow-circle-left"
        alt="Arrow circle left"
        src={arrowLeft}
        onClick={handleBackClick}
      />
      <div className="container-geracaoMundo">
        <div className="text-wrapper-2">"GERAR UM TEMA PARA O SEU MUNDO"</div>
        
        <div className="input-group">
          <label className={`label ${themeFocused ? 'focused' : ''}`}>TEMA</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setTheme(e.target.value)}
            onFocus={() => setThemeFocused(true)}
            onBlur={(e) => setThemeFocused(e.target.value !== '')}
          />
        </div>

        <img className="arrow-circle-right" alt="Arrow circle right" onClick={handleSubmit} src={circleRight} />
      </div>
    </div>
  );
};

export default TelaGeracaoMundo;