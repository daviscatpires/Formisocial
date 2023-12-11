import React, { useState } from 'react'
import './register.css'
import axios from 'axios';
import Modal from 'react-modal';
import { Link, Route } from 'react-router-dom';

Modal.setAppElement('#root');

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        birthDate: '',
        email: '',
        phoneNumber: '',
        password: '',
        cep: '',
        street: '',
        houseNumber: '',
        complement: '',
        coins:'',
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleRegister = async () => {
        try {
          console.log('Attempting to register:', formData);
          const { isDuplicate } = await checkDuplicateData(formData);
      
          if (isDuplicate) {
            setError('E-mail ou número de celular já estão sendo utilizados.');
            setModalIsOpen(true);
          } else {
            const response = await axios.post('http://localhost:5000/register', formData);
            console.log('Response from register:', response.data);
            setModalIsOpen(true);
          }
        } catch (error) {
          console.error('Error in handleRegister:', error);
        }
      };

    const checkDuplicateData = async (formData: { fullName: string; birthDate: string; email: string; phoneNumber: string; password: string; cep: string; street: string; houseNumber: string; complement: string; }) => {
        try {
          const response = await axios.post('http://localhost:5000/checkDuplicateData', formData);
          console.log('Response from checkDuplicateData:', response.data);
          return response.data.isDuplicate;
        } catch (error) {
          console.error('Error in checkDuplicateData:', error);
          return true; // Tratar erro como duplicata para evitar problemas
        }
      };

    const closeModal = () => {
        setModalIsOpen(false);
        setError(''); // Limpar a mensagem de erro ao fechar o modal
    };

    return (
        <div className='register'>
            <div className='Title'>Registre-se</div>
            <div className='campos'>
                <div className='name'>
                    <label htmlFor="fullName">Nome completo:</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                </div>
                <div className='date'>
                    <label htmlFor="birthDate">Data de nascimento:</label>
                    <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleInputChange} />
                </div>
                <div className='email'>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className='number'>
                    <label htmlFor="phoneNumber">Número de telefone:</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                </div>
                <div className='password'>
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
                </div>
                <div className='endereco'>
                    <div className='cep'>
                        <label htmlFor="cep">CEP:</label>
                        <input type="text" id="cep" name="cep" value={formData.cep} onChange={handleInputChange} />
                    </div>
                    <div className='rua'>
                        <label htmlFor="street">Rua:</label>
                        <input type="text" id="street" name="street" value={formData.street} onChange={handleInputChange} />
                    </div>
                    <div className='number-home'>
                        <label htmlFor="houseNumber">Número</label>
                        <input type="number" id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleInputChange} />
                    </div>
                    <div className='complement'>
                        <label htmlFor="complement">Complemento</label>
                        <input type="text" id="complement" name="complement" value={formData.complement} onChange={handleInputChange} />
                    </div>
                </div>
            </div>
            <div className='buttons'>
                <button className='submit' onClick={handleRegister}>Enviar</button>
                <button className='submit'>Cancelar</button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className='Modal'
            >
                {error ? (
                    <>
                        <h2>Erro ao registrar usuário</h2>
                        <p>{error}</p>
                        <button onClick={closeModal}>Fechar</button>
                    </>
                ) : (
                    <>
                        <h2>Registro efetuado com sucesso!</h2>
                        <p>Acesse aqui para fazer login</p>
                        <Link to="/" className='submit'>Login</Link>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default Register