import React, { useEffect, useState } from 'react';
import DeletePhoto from './DeletePhoto';
import DetailPhoto from './DetailPhoto';

const ListPhotos = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('https://example.com/api/photos/')
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((error) => console.error('Error fetching photos:', error));
  }, []);

  const handleDelete = (photoId) => {
    setPhotos(photos.filter((photo) => photo.id !== photoId));
  };

  return (
    <div>
      <h2>Photos List</h2>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <DetailPhoto photoId={photo.id} />
            <DeletePhoto photoId={photo.id} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPhotos;
