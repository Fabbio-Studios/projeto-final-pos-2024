import React, { useState, useEffect } from 'react';

const UpdateUser = ({ userId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch(`https://example.com/api/users/${userId}/`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
      })
      .catch((error) => console.error('Error fetching user for update:', error));
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = { name, email };

    fetch(`https://example.com/api/users/${userId}/`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((user) => {
        setName(user.name);
        setEmail(user.email);
      })
      .catch((error) => console.error('Error updating user:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUser;
