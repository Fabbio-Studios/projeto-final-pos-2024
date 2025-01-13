import React, { useState } from 'react';

const CreatePhoto = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPhoto = { title, url };

    fetch('https://example.com/api/photos/', {
      method: 'POST',
      body: JSON.stringify(newPhoto),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then((photo) => onCreate(photo))
      .catch((error) => console.error('Error creating photo:', error));

    setTitle('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Photo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Photo URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="submit">Create Photo</button>
    </form>
  );
};

export default CreatePhoto;
