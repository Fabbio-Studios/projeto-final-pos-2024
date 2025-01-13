import React from 'react';

const DeletePhoto = ({ photoId, onDelete }) => {
  const handleDelete = () => {
    fetch(`https://example.com/api/photos/${photoId}/`, {
      method: 'DELETE',
    })
      .then(() => onDelete(photoId))
      .catch((error) => console.error('Error deleting photo:', error));
  };

  return <button onClick={handleDelete}>Delete Photo</button>;
};

export default DeletePhoto;
