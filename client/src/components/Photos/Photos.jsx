import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Photos.css'; // Arquivo CSS para estilos

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    album: 1, // Ajuste o valor padrão do álbum conforme necessário
    url: '',
    thumbnailUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Carregar as fotos ao montar o componente
  useEffect(() => {
    fetchPhotos();
  }, []);

  // Função para buscar as fotos
  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/photos/');
      setPhotos(response.data);
    } catch (error) {
      setError('Erro ao carregar as fotos. Tente novamente.');
      console.error('Erro ao buscar fotos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar uma nova foto
  const handleAddPhoto = async () => {
    const { title, url, thumbnailUrl } = newPhoto;
    if (!title.trim() || !url.trim() || !thumbnailUrl.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/photos/', newPhoto);
      setPhotos((prevPhotos) => [...prevPhotos, response.data]);
      setNewPhoto({ title: '', album: 1, url: '', thumbnailUrl: '' });
    } catch (error) {
      alert('Erro ao adicionar a foto. Tente novamente.');
      console.error('Erro ao adicionar foto:', error);
    }
  };

  // Excluir uma foto
  const handleDeletePhoto = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/photos/${id}/`);
      setPhotos(photos.filter((photo) => photo.id !== id));
    } catch (error) {
      alert('Erro ao excluir a foto. Tente novamente.');
      console.error('Erro ao excluir foto:', error);
    }
  };

  return (
    <div className="photos-container">
      <h1>Galeria de Fotos</h1>

      {/* Exibe mensagem de erro, se houver */}
      {error && <p className="error-message">{error}</p>}

      {/* Formulário para adicionar uma nova foto */}
      <div className="form">
        <input
          type="text"
          placeholder="Título da Foto"
          value={newPhoto.title}
          onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="URL da Foto"
          value={newPhoto.url}
          onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
          className="input-field"
        />
        <input
          type="text"
          placeholder="URL da Miniatura"
          value={newPhoto.thumbnailUrl}
          onChange={(e) =>
            setNewPhoto({ ...newPhoto, thumbnailUrl: e.target.value })
          }
          className="input-field"
        />
        <button onClick={handleAddPhoto} className="add-button">
          Adicionar Foto
        </button>
      </div>

      {/* Exibe uma mensagem de carregamento enquanto busca as fotos */}
      {loading && <p>Carregando fotos...</p>}

      {/* Lista de fotos */}
      <ul className="photo-list">
        {photos.map((photo) => (
          <li key={photo.id} className="photo-item">
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              className="photo-thumbnail"
            />
            <div className="photo-details">
              <h3>{photo.title}</h3>
              <p>Álbum: {photo.album}</p>
            </div>
            <button
              onClick={() => handleDeletePhoto(photo.id)}
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

export default Photos;
