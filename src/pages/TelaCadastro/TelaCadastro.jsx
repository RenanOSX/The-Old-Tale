import React, { useContext, useState } from "react";

import { useNavigate } from 'react-router-dom';

import AuthServices from "../../services/AuthServices";

import './TelaCadastro.css';

import arrowLeft from '/assets/icons/arrow_circle_left.png';

import circleRight from '/assets/icons/arrow_circle_right.png';

import InputGroup from '../../components/InputGroup/InputGroup';

import { handleAuthErrorCadastro, playMusic } from "../../utils/Functions";

import GameplayService from "../../services/GameplayService";

import { AuthContext } from "../../context/AuthContext";

import Spinner from "../../components/Spinner/Spinner";

const TelaCadastro = () => {  
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [name, setName] = useState('');

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const { handleSignup }  = useContext(AuthContext);

  const [theme, setTheme] = useState('');

  const [error, setError] = useState('');

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Ativar loading

    if (password !== confirmPassword) {
      setError('As senhas não correspondem.');
      setLoading(false); // Desativar loading
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
          setLoading(false); // Desativar loading
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
          setLoading(false); // Desativar loading
          return;
        }

        navigate(-1);
      } else {
        setError('Erro ao criar conta.');
      }
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      setError('Erro ao criar conta.');
    } finally {
      setLoading(false); // Desativar loading
    }
  };

  return (
    <div className="cadastro">
      <div className="container-cadastro">
        { loading ? (
          <Spinner />
        ) : (
          <>
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
            <div className="button-return">
              <img
                className="arrow-circle-left"
                alt="Arrow circle left"
                src={arrowLeft}
                onClick={handleBackClick}
              />
              <img
                className="arrow-circle-right"
                alt="Arrow circle right"
                src={circleRight}
                onClick={handleSignupSubmit}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TelaCadastro;