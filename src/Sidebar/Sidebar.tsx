import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; // Importe o arquivo CSS
import { useUser } from '../Context/UserContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

interface SidebarProps {
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { userId } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        if (userId) {
          const response = await axios.get(`http://localhost:5000/user/${userId}`);
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Erro ao carregar dados do usuário.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Carregue o token do localStorage ou de onde você o armazena
    const token = localStorage.getItem('token');
  
    if (token) {
      // Decodifique o token para obter informações do usuário
      // const decodedToken: { [key: string]: any } = jwt_decode(token);
      // Extraia o nome do usuário do token decodificado
      // const userFullName: string = decodedToken.fullName;
      // setUserName(userFullName);
    }
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    clearUserData(); // Adicione essa função para limpar o estado do usuário
    handleLogout();
    window.location.reload();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar} style={{ left: isOpen ? '200px' : '0' }}>
        {isOpen ? 'X' : '☰'}
      </button>
      <div className="logo"></div>
      <div className="user-info">
        {loading ? (
          <h2>Carregando...</h2>
        ) : error ? (
          <p>{error}</p>
        ) : userData && userData.user && userData.user.fullName ? (
          <><h2>{userData.user.fullName}</h2><p>Açucar: {userData.user.coins}</p></>
        ) : (
          <h2>Carregando...</h2>
        )}
      </div>
      <ul className="navigation-links">
        <li>
          <FontAwesomeIcon icon={icon({name: 'house'})} />
          <Link to="/Home" className='navigation-links-re'>Feed</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={icon({name: 'gamepad'})} />
          <Link to="/Games">Jogos</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={icon({name: 'chess-rook'})} />
          <Link to="/Clan">Meu clã</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={icon({name: 'chess-rook'})} /><FontAwesomeIcon icon={icon({name: 'chess-rook'})} />
          <Link to="/Clan">Clãs</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={icon({name: 'cart-shopping'})} />
          <Link to="/Buy">Comprar</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={icon({name: 'gears'})} />
          <Link to="/settings" className='navigation-links-re'>Configurações</Link>
        </li>
        <FontAwesomeIcon icon={icon({name: 'right-to-bracket'})} />
        <Link to="/login" onClick={handleLogoutClick}>
            Sair
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
function clearUserData() {
  throw new Error('Function not implemented.');
}

