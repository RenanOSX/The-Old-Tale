import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';

import yinYang from '../../assets/images/yin_yang.png';

import circleRight from '../../assets/icons/arrow_circle_right.png';

import AuthServices from "../../services/AuthServices";

import './TelaInicial.css';

import audio from '../../assets/mp3.mp3';

const TelaInicial = ({ onLogin }) => {
  const [emailFocused, setEmailFocused] = useState(false);
  
  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');
  
  const [passwordFocused, setPasswordFocused] = useState(false);

  const navigate = useNavigate();

  const navegarCadastro = () => {
    navigate('/cadastro');
  };

  const navegarRecSenha = () => {
    navigate('/recuperarSenha');
  };

  const nevegarTelaPrincipal = async () => {
    const result = await AuthServices.login(email, password);

    const music = new Audio(audio);

    music.loop = true;

    music.play().catch(error => {
      console.error('Error playing audio:', error);
    })

    music.volume = 0.1;

    if (result.success) {
      onLogin(result.user);

      const theme = await AuthServices.buscarTheme(result.user.uid);

      if (theme && theme !== '') {
        navigate('/telaPrincipal');
      } else {
        navigate('/geracaoMundo');
      }
    } else {
      console.error(result.error);
    }
  };

  return (
    <div className="tela-inicial">
      <div className="container-inicial">
        <img className="yin-yang-inicial" alt="Yin yang" src={yinYang} />
        <div className="input-group">
          <label className={`label ${emailFocused ? 'focused' : ''}`}>EMAIL</label>
          <input
            type="email"
            className="input"
            onFocus={() => setEmailFocused(true)}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => setEmailFocused(e.target.value !== '')}
          />
        </div>
        <div className="input-group">
          <label className={`label ${passwordFocused ? 'focused' : ''}`}>SENHA</label>
          <input
            type="password"
            className="input"
            onFocus={() => setPasswordFocused(true)}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => setPasswordFocused(e.target.value !== '')}
          />
        </div>
        <div className="text-link" onClick={navegarCadastro}>CADASTRAR</div>
        <div className="text-link" onClick={navegarRecSenha}>RECUPERAR SENHA</div>
        <img className="arrow-circle-right" alt="Arrow circle right" onClick={nevegarTelaPrincipal} src={circleRight} />
      </div>
    </div>
  );
};

export default TelaInicial;