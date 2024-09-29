import React from "react";

import { useNavigate } from 'react-router-dom';

import { useState } from "react";

import AuthServices from "../../services/AuthServices";

import './TelaGeracaoMundo.css';

import arrowLeft from '../../assets/icons/arrow_circle_left.png';

import circleRight from '../../assets/icons/arrow_circle_right.png';

import GameplayService from "../../services/GameplayService";

import audio from '../../assets/mp3.mp3';

const TelaGeracaoMundo = () => { 
  const navigate = useNavigate();
  
  const [theme, setTheme] = useState('');

  const [themeFocused, setThemeFocused] = useState(false);

  const handleBackClick = () => {
    navigate('/telaInicial');
  };

  const handleSubmit = async () => {
    try {
      const currentUser = await AuthServices.getCurrentUser();
      if (currentUser) {
        console.log('Usuário autenticado:', currentUser);
        
        currentUser.theme = theme;
        
        const color = await GameplayService.changeTheme(theme);
        
        currentUser.color = color;
        
        await AuthServices.updateUser(currentUser);
        
        console.log('Tema atualizado:', currentUser.theme);

        const music = new Audio(audio);

        music.volume = 0.1;

        music.loop = true;

        music.play().catch(error => {
          console.error('Error playing audio:', error);
        });
        
        navigate('/telaPrincipal');
      } else {
        console.error('Usuário não autenticado');
      }
    } catch (error) {
      console.error('Erro ao atualizar o tema:', error);
    }
  };

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