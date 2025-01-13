import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Users from './components/Users/Users';
import CreateUser from './components/Users/CreateUser';
import UpdateUser from './components/Users/UpdateUser';
import ToDos from './components/Todos/ToDos';
import Albums from './components/Album/Albums';
import Photos from './components/Photos/Photos';
import './index.css'; // Importação do CSS global

const App = () => {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);

  // Função para buscar usuários da API
  const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    setUsers(data);
  };

  // Função para buscar tarefas (todos) da API
  const fetchTodos = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    setTodos(data);
  };

  // Função para buscar álbuns da API
  const fetchAlbums = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    const data = await response.json();
    setAlbums(data);
  };

  // Função para buscar fotos da API
  const fetchPhotos = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    const data = await response.json();
    setPhotos(data);
  };

  // Efeito para buscar os dados assim que o componente for montado
  useEffect(() => {
    fetchUsers();
    fetchTodos();
    fetchAlbums();
    fetchPhotos();
  }, []);

  return (
    <div>
      <nav>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/todos">ToDos</NavLink>
        <NavLink to="/albums">Albums</NavLink>
        <NavLink to="/photos">Photos</NavLink>
      </nav>
      <div>
        <Routes>
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/create-user" element={<CreateUser onAddUser={(newUser) => setUsers((prevUsers) => [...prevUsers, newUser])} />} />
          <Route path="/update-user/:userId" element={<UpdateUser />} />
          <Route path="/todos" element={<ToDos todos={todos} />} />
          <Route path="/albums" element={<Albums albums={albums} />} />
          <Route path="/photos" element={<Photos photos={photos} />} />
        </Routes>
      </div>
      <footer>© 2025 Your App Name. All rights reserved.</footer>
    </div>
  );
};

export default App;
