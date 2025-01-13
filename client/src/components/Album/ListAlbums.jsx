import React, { useEffect, useState } from 'react';
import DeleteAlbum from './DeleteAlbum';
import DetailAlbum from './DetailAlbum';

const ListAlbums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch('https://example.com/api/albums/')
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.error('Error fetching albums:', error));
  }, []);

  const handleDelete = (albumId) => {
    setAlbums(albums.filter((album) => album.id !== albumId));
  };

  return (
    <div>
      <h2>Albums List</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <DetailAlbum albumId={album.id} />
            <DeleteAlbum albumId={album.id} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListAlbums;
