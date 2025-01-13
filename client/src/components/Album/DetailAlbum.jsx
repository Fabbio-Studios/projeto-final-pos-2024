import React, { useEffect, useState } from 'react';

const DetailAlbum = ({ albumId }) => {
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    fetch(`https://example.com/api/albums/${albumId}/`)
      .then((response) => response.json())
      .then((data) => setAlbum(data))
      .catch((error) => console.error('Error fetching album details:', error));
  }, [albumId]);

  if (!album) return <div>Loading...</div>;

  return (
    <div>
      <h2>{album.title}</h2>
      <p>Details of the album...</p>
    </div>
  );
};

export default DetailAlbum;
