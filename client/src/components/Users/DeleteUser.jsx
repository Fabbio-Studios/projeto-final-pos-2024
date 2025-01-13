import React from 'react';

const DeleteUser = ({ userId, onDelete }) => {
  const handleDelete = () => {
    fetch(`https://example.com/api/users/${userId}/`, {
      method: 'DELETE',
    })
      .then(() => onDelete(userId))
      .catch((error) => console.error('Error deleting user:', error));
  };

  return <button onClick={handleDelete}>Delete User</button>;
};

export default DeleteUser;
