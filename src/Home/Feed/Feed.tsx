// PostFeed.tsx
import React, { useEffect, useState } from 'react';
import './feed.css';
import selfie from "../../assets/selfie.jpeg";

// Exemplo de um componente Post
const Post: React.FC<{ post: any }> = ({ post }) => {
  return (
    <div className="post-container">
      <h4>{post.title}</h4>
      <p>{post.body}</p>
      <img className='img-container' src={post.photo} alt={`Imagem de ${post.author}`} />
      <div className="post-actions">
        <button className="like-button">Curtir</button>
        <button className="comment-button">Comentar</button>
        <button className="share-button">Compartilhar</button>
      </div>
    </div>
  );
};

const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([
    {
      id: 1,
      title: 'Davi Scatamburgo Pires',
      body: 'Estou me sentindo lindo hoje.',
      photo: selfie,
      author: 'Autor 1',
      coins: 10,
    },
    {
      id: 2,
      title: 'Eduardo Gayliveira',
      body: 'Conteúdo da postagem 2...',
      photo: 'url_da_foto_2.jpg',
      author: 'Autor 2',
      coins: 5,
    },
    // Adicione mais postagens conforme necessário
  ]);

  useEffect(() => {
    // Aqui você pode chamar uma função que carrega as postagens de outras pessoas
    // por exemplo, uma função que faz uma solicitação à sua API
    // e define as postagens usando setPosts
    const fetchData = async () => {
      try {
        // Substitua a URL abaixo pela sua API de busca de postagens
        const response = await fetch('https://api.example.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="post-feed">
      <h3>Feed de Postagens</h3>
      {posts.map((post) => (
        <div key={post.id} className="post">
          {/* Renderizar detalhes da postagem usando o componente Post */}
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
