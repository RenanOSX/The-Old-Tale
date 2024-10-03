import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';

import yinYang from '/assets/images/yin_yang.png';

import circleRight from '/assets/icons/arrow_circle_right.png';

import AuthServices from "../../services/AuthServices";

import './TelaInicial.css';

import InputGroup from '../../components/InputGroup/InputGroup';

import { playMusic, handleAuthError } from "../../utils/Functions";

const TelaInicial = ({ onLogin }) => {

  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const navegarCadastro = () => {
    navigate('/cadastro');
  };

  const navegarRecSenha = () => {
    navigate('/recuperarSenha');
  };

  const handleLogin = async () => {
    try {
      const result = await AuthServices.login(email, password);
      
      if (result.success) {
        onLogin(result.user);

        playMusic();

        navigate('/telaPrincipal');
        
      } else {
        handleAuthError(result.error, setError);
      }
    } catch (error) {
      handleAuthError(error, setError);
    }
  };

  return (
    <div className="tela-inicial">
      <div className="container-inicial">
        <img className="yin-yang-inicial" alt="Yin yang" src={yinYang} />
        {error && <p className="error-message">{error}</p>}
        <InputGroup
          label="EMAIL"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputGroup
          label="SENHA"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-link" onClick={navegarCadastro}>CADASTRAR</div>
        <div className="text-link" onClick={navegarRecSenha}>RECUPERAR SENHA</div>
        <img className="arrow-circle-right" alt="Arrow circle right" onClick={handleLogin} src={circleRight} />
      </div>
    </div>
  );
};

export default TelaInicial;