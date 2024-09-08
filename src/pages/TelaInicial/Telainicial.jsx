import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import yinYang from '../../assets/images/yin_yang.png';
import AuthServices from "../../services/AuthServices";
import circleRight from '../../assets/icons/arrow_circle_right.png';
import './TelaInicial.css';

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
    if (result.success) {
      onLogin(result.user);
      navigate('/telaPrincipal');
    } else {
      console.error(result.error);
    }
  };

  return (
    <div className="tela-inicial">
      <div className="container">
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