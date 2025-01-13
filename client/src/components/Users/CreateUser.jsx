import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/users/', { name, email });
      setSuccess(true);
      setName('');
      setEmail('');
      onAddUser(response.data); // Call the function to add the new user to the list
      console.log('Usuário criado com sucesso:', response.data);
    } catch (error) {
      setError('Erro ao criar usuário. Tente novamente.');
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <div className="create-user-container">
      <h1>Criar Novo Usuário</h1>

      {success && <p>Usuário criado com sucesso!</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <button type="submit">Criar Usuário</button>
      </form>
    </div>
  );
};

export default CreateUser;
