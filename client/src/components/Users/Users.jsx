import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/users/');
      setUsers(response.data);
    } catch (error) {
      setError('Erro ao carregar usuários. Tente novamente.');
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar este usuário?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/users/${id}/`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      alert('Erro ao deletar usuário. Tente novamente.');
      console.error('Erro ao deletar usuário:', error);
    }
  };

  return (
    <div className="users-container">
      <h1>Gerenciamento de Usuários</h1>

      {error && <p className="error-message">{error}</p>}

      {/* Link para criar um novo usuário */}
      <Link to="/create-user">
        <button>Criar Novo Usuário</button>
      </Link>

      {loading && <p>Carregando usuários...</p>}

      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <button onClick={() => handleDeleteUser(user.id)} className="delete-button">
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
