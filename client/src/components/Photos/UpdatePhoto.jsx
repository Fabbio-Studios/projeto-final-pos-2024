import React, { useState, useEffect } from 'react';

const UpdatePhoto = ({ photoId, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetch(`https://example.com/api/photos/${photoId}/`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setUrl(data.url);
      })
      .catch((error) => console.error('Error fetching photo for update:', error));
  }, [photoId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPhoto = { title, url };

    fetch(`https://example.com/api/photos/${photoId}/`, {
      method: 'PUT',
      body: JSON.stringify(updatedPhoto),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((photo) => onUpdate(photo))
      .catch((error) => console.error('Error updating photo:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="submit">Update Photo</button>
    </form>
  );
};

export default UpdatePhoto;
