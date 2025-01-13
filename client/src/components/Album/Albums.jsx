import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Albums.css'; // Arquivo CSS para estilos

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({ title: '', user: 1 }); // Ajuste o valor do usuário conforme necessário
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Carregar os álbuns ao montar o componente
  useEffect(() => {
    fetchAlbums();
  }, []);

  // Função para buscar os álbuns
  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/albums/');
      setAlbums(response.data);
    } catch (error) {
      setError('Erro ao carregar os álbuns. Tente novamente.');
      console.error('Erro ao buscar álbuns:', error);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar um novo álbum
  const handleAddAlbum = async () => {
    const { title } = newAlbum;
    if (!title.trim()) {
      alert('O título do álbum não pode estar vazio.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/albums/', newAlbum);
      setAlbums((prevAlbums) => [...prevAlbums, response.data]);
      setNewAlbum({ title: '', user: 1 });
    } catch (error) {
      alert('Erro ao adicionar o álbum. Tente novamente.');
      console.error('Erro ao adicionar álbum:', error);
    }
  };

  // Excluir um álbum
  const handleDeleteAlbum = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/albums/${id}/`);
      setAlbums(albums.filter((album) => album.id !== id));
    } catch (error) {
      alert('Erro ao excluir o álbum. Tente novamente.');
      console.error('Erro ao excluir álbum:', error);
    }
  };

  return (
    <div className="albums-container">
      <h1>Minha Coleção de Álbuns</h1>

      {/* Exibe mensagem de erro, se houver */}
      {error && <p className="error-message">{error}</p>}

      {/* Formulário para adicionar um novo álbum */}
      <div className="form">
        <input
          type="text"
          placeholder="Título do Álbum"
          value={newAlbum.title}
          onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
          className="input-field"
        />
        <button onClick={handleAddAlbum} className="add-button">
          Adicionar Álbum
        </button>
      </div>

      {/* Exibe uma mensagem de carregamento enquanto busca os álbuns */}
      {loading && <p>Carregando álbuns...</p>}

      {/* Lista de álbuns */}
      <ul className="album-list">
        {albums.map((album) => (
          <li key={album.id} className="album-item">
            <span>{album.title}</span>
            <button
              onClick={() => handleDeleteAlbum(album.id)}
              className="delete-button"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
