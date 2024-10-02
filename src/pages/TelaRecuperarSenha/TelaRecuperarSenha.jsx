import React from "react";

import { useNavigate } from 'react-router-dom';

import { useState } from "react";

import './TelaRecuperarSenha.css';

import AuthServices from "../../services/AuthServices";

import arrowLeft from '../../assets/icons/arrow_circle_left.png';

import circleRight from '../../assets/icons/arrow_circle_right.png';

const TelaRecuperarSenha = () => {  
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [emailFocused, setEmailFocused] = useState(false);

  const handleBackClick = () => {
    navigate('/');
  };

  const recuperarSenha = async () => {
    const result = await AuthServices.resetPassword(email);
    if (result.success) {
      navigate('/');
    } else {
      console.error(result.error);
    }
  }

  return (
    <div className="recSenha">
      <img
        className="arrow-circle-left"
        alt="Arrow circle left"
        src={arrowLeft}
        onClick={handleBackClick}
      />
      <div className="container-recSenha">
        <div className="text-wrapper-2">RECUPERAR SENHA</div>
        
        <div className="input-group">
          <label className={`label ${emailFocused ? 'focused' : ''}`}>EMAIL</label>
          <input
            type="email"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocused(true)}
            onBlur={(e) => setEmailFocused(e.target.value !== '')}
          />
        </div>

        <img className="arrow-circle-right" alt="Arrow circle right"  onClick={recuperarSenha} src={circleRight} />
      </div>
    </div>
  );
};

export default TelaRecuperarSenha;