import React, { useState, useEffect } from 'react';

const UpdateAlbum = ({ albumId, onUpdate }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch(`https://example.com/api/albums/${albumId}/`)
      .then((response) => response.json())
      .then((data) => setTitle(data.title))
      .catch((error) => console.error('Error fetching album for update:', error));
  }, [albumId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedAlbum = { title };

    fetch(`https://example.com/api/albums/${albumId}/`, {
      method: 'PUT',
      body: JSON.stringify(updatedAlbum),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((album) => onUpdate(album))
      .catch((error) => console.error('Error updating album:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Update Album</button>
    </form>
  );
};

export default UpdateAlbum;
