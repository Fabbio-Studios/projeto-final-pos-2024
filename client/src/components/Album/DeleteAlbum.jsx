import React from 'react';

const DeleteAlbum = ({ albumId, onDelete }) => {
  const handleDelete = () => {
    fetch(`https://example.com/api/albums/${albumId}/`, {
      method: 'DELETE',
    })
      .then(() => onDelete(albumId))
      .catch((error) => console.error('Error deleting album:', error));
  };

  return <button onClick={handleDelete}>Delete Album</button>;
};

export default DeleteAlbum;
