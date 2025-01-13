import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateUser = () => {
  const { userId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${userId}/`)
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
      })
      .catch((error) => console.error('Error fetching user for update:', error));
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = { name, email };

    try {
      const response = await axios.put(`http://localhost:8000/api/users/${userId}/`, updatedUser);
      setSuccess(true);
      setName(response.data.name);
      setEmail(response.data.email);
    } catch (error) {
      setError('Erro ao atualizar usuário. Tente novamente.');
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="update-user-container">
      <h1>Atualizar Usuário</h1>

      {success && <p>Usuário atualizado com sucesso!</p>}
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

        <button type="submit">Atualizar Usuário</button>
      </form>
    </div>
  );
};

export default UpdateUser;
