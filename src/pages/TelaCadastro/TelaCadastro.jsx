import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthServices from "../../services/AuthServices";
import './TelaCadastro.css';
import arrowLeft from '../../assets/icons/arrow_circle_left.png';
import circleRight from '../../assets/icons/arrow_circle_right.png';

const TelaCadastro = () => {  
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [name, setName] = useState('');

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailFocused, setEmailFocused] = useState(false);

  const [nameFocused, setNameFocused] = useState(false);

  const [passwordFocused, setPasswordFocused] = useState(false);

  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const handleBackClick = () => {
    navigate('/');
  };

  const registrarConta = async () => {
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    const result = await AuthServices.register(email, password, name);
    if (result.success) {
      navigate('/geracaoMundo');
    } else {
      console.error(result.error);
    }
  };

  return (
    <div className="cadastro">
      <img
        className="arrow-circle-left"
        alt="Arrow circle left"
        src={arrowLeft}
        onClick={handleBackClick}
      />
      <div className="container-cadastro">
        <div className="text-wrapper-2">CADASTRO</div>
        
        <div className="input-group">
          <label className={`label ${emailFocused ? 'focused' : ''}`}>EMAIL</label>
          <input
            type="email"
            className="input"
            value={email}
            onFocus={() => setEmailFocused(true)}
            onBlur={(e) => setEmailFocused(e.target.value !== '')}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label className={`label ${nameFocused ? 'focused' : ''}`}>NOME</label>
          <input
            type="text"
            className="input"
            value={name}
            onFocus={() => setNameFocused(true)}
            onBlur={(e) => setNameFocused(e.target.value !== '')}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label className={`label ${passwordFocused ? 'focused' : ''}`}>SENHA</label>
          <input
            type="password"
            className="input"
            value={password}
            onFocus={() => setPasswordFocused(true)}
            onBlur={(e) => setPasswordFocused(e.target.value !== '')}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className={`label ${confirmPasswordFocused ? 'focused' : ''}`}>CONFIRMAR SENHA</label>
          <input
            type="password"
            className="input"
            value={confirmPassword}
            onFocus={() => setConfirmPasswordFocused(true)}
            onBlur={(e) => setConfirmPasswordFocused(e.target.value !== '')}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <img className="arrow-circle-right" alt="Arrow circle right" src={circleRight} onClick={registrarConta} />
      </div>
    </div>
  );
};

export default TelaCadastro;