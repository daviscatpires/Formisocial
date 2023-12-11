import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './home.css'; // Importe o arquivo CSS
import Feed from './Feed/Feed';
import Rankings from './Rankings/Rankings';
import { useUser } from '../Context/UserContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface HomeProps {
  handleLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ handleLogout }) => {
  const { userId } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const routeLocation = useLocation();


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://localhost:5000/user/${userId}`);
          setUserData(response.data);
          setUserDataLoaded(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        // Adiciona um atraso de 2 segundos antes de definir o carregamento como concluído
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
  
    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Carregando dados do usuário...</div>;
  }

  if (!userDataLoaded) {
    return <div>Dados do usuário não carregados com sucesso. Recarregue a página.</div>;
  }

  const loadUserPosts = (userId: string) => {
    // Lógica para carregar as postagens do usuário (chamada à API, etc.)
    console.log(`Carregando postagens para o usuário ${userId}`);
    // ... sua lógica de carregamento aqui
  };

  return (
    <div className="home-container">
      {/* Sidebar à esquerda */}
      <Sidebar handleLogout={handleLogout} />

      {/* Feed no meio */}
      <div className="main-content">
        {routeLocation.pathname === '/Home' && (
          <>
            <Feed />
          </>
        )}
      </div>

      {/* Lista à direita (Rankings, por exemplo) */}
      <div className="right-sidebar">
        <Rankings />
        {/* Adicione outros componentes à direita conforme necessário */}
      </div>
    </div>
  );
}

export default Home;