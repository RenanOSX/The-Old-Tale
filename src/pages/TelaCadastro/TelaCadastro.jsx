import React, { useContext, useState } from "react";

import { useNavigate } from 'react-router-dom';

import AuthServices from "../../services/AuthServices";

import './TelaCadastro.css';

import arrowLeft from '../../assets/icons/arrow_circle_left.png';

import circleRight from '../../assets/icons/arrow_circle_right.png';

import InputGroup from '../../components/InputGroup/InputGroup';

import { handleAuthErrorCadastro, playMusic } from "../../utils/Functions";

import GameplayService from "../../services/GameplayService";

import { AuthContext } from "../../context/AuthContext";

const TelaCadastro = () => {  
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [name, setName] = useState('');

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const { handleSignup }  = useContext(AuthContext);

  const [theme, setTheme] = useState('');

  const [error, setError] = useState('');

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não correspondem.');
      return;
    }

    try {
      const result = await handleSignup(email, password, name);
      if (result.success) {
        const currentUser = result.user;
        currentUser.theme = theme;

        const color = await GameplayService.changeTheme(theme);
        currentUser.color = color;

        try {
          await AuthServices.updateAuthProfile(currentUser);
          console.log('Current user: ', currentUser);
          console.log('Perfil de autenticação atualizado com sucesso.');
        } catch (error) {
          console.error('Erro ao atualizar perfil de autenticação:', error);
          setError('Erro ao atualizar perfil de autenticação.');
          return;
        }

        // Atualizar dados no Realtime Database
        try {
          await AuthServices.setUserInDatabase(currentUser);
          console.log('Current user: ', currentUser);
          console.log('Dados atualizados no Realtime Database com sucesso.');
        } catch (error) {
          console.error('Erro ao atualizar dados no Realtime Database:', error);
          setError('Erro ao atualizar dados no Realtime Database.');
          return;
        }

        // Tocar música
        playMusic();

        navigate('/telaPrincipal');
      } else {
        setError(result.error.message);
      }
    } catch (error) {
      setError(error.message);
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
        {error && <p className="error-message">{error}</p>}
        <InputGroup
          label="EMAIL"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputGroup
          label="NOME"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputGroup
          label="SENHA"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputGroup
          label="CONFIRMAR SENHA"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <InputGroup
          label="TEMA"
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />
        <img
          className="arrow-circle-right"
          alt="Arrow circle right"
          src={circleRight}
          onClick={handleSignupSubmit}
        />
      </div>
    </div>
  );
};

export default TelaCadastro;