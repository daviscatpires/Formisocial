import React, { useState } from 'react';
import './form.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface FormProps {
  handleAuthentication: (token: string) => void;
}

const Form: React.FC<FormProps> = ({ handleAuthentication }) => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value);
  };


  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/form', {
        emailOrPhoneNumber: login,
        password: senha,
      });
  
      // Chama a função handleAuthentication com o token do servidor
      handleAuthentication(response.data.token);
    } catch (error) {
      console.error('Ocorreu um erro ao realizar o login:');
    }
  };

  return (
    <div className="Formulario">
      <div className="Title">Formulário</div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="login">Email ou celular</label>
        <input type="text" id="login" value={login} onChange={handleLoginChange} />

        <label htmlFor="senha">Senha</label>
        <input type="password" id="senha" value={senha} onChange={handleSenhaChange} />

        <button type="submit">Enviar</button>
        <Link to="/register">Não tem uma conta? Crie aqui</Link>
      </form>
    </div>
  );
};

export default Form;
