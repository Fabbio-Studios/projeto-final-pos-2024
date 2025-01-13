import React, { useState } from 'react';

const CreateAlbum = ({ onCreate }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAlbum = { title };

    fetch('https://example.com/api/albums/', {
      method: 'POST',
      body: JSON.stringify(newAlbum),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then((album) => onCreate(album))
      .catch((error) => console.error('Error creating album:', error));

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Album title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Create Album</button>
    </form>
  );
};

export default CreateAlbum;
