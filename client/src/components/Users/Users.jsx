import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Função para buscar usuários da API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(''); // Resetando o erro ao tentar buscar novamente
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
      // Atualizando a lista de usuários após a remoção
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      alert('Erro ao deletar usuário. Tente novamente.');
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="users-container">
      <h1>Gerenciamento de Usuários</h1>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchUsers}>Tentar Novamente</button>
        </div>
      )}

      {loading && <p className="loading-message">Carregando usuários...</p>}

      <Link to="/create-user">
        <button className="create-user-button">Criar Novo Usuário</button>
      </Link>

      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <Link to={`/update-user/${user.id}`}>
              <button className="update-button">Atualizar</button>
            </Link>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="delete-button"
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
