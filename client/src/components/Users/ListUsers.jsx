import React, { useEffect, useState } from 'react';
import DeleteUser from './DeleteUser';
import UpdateUser from './UpdateUser';

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://example.com/api/users/')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div>{user.name} - {user.email}</div>
            <UpdateUser userId={user.id} />
            <DeleteUser userId={user.id} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;
