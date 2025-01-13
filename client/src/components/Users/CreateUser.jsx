import React, { useState } from 'react';
import axios from 'axios';
import './CreateUser.css';

const CreateUser = () => {
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!newUser.name.trim() || !newUser.email.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/users/', newUser);
      setSuccess('Usuário criado com sucesso!');
      setNewUser({ name: '', email: '' });
    } catch (error) {
      setError('Erro ao criar usuário. Tente novamente.');
      console.error('Erro ao adicionar usuário:', error);
    }
  };

  return (
    <div className="create-user-container">
      <h1>Criar Usuário</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Nome"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <button type="submit">Criar Usuário</button>
      </form>
    </div>
  );
};

export default CreateUser;
