import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todos.css'; // Arquivo CSS para estilos

const ToDos = () => {
  const [todos, setToDos] = useState([]);
  const [newToDo, setNewToDo] = useState({ title: '', completed: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Carregar os ToDos ao montar o componente
  useEffect(() => {
    fetchToDos();
  }, []);

  // Função para buscar os ToDos
  const fetchToDos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/todos/');
      setToDos(response.data);
    } catch (error) {
      setError('Erro ao carregar ToDos. Tente novamente.');
      console.error('Erro ao buscar ToDos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar um novo ToDo
  const handleAddToDo = async () => {
    if (!newToDo.title.trim()) {
      alert('Por favor, insira um título para o ToDo.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/todos/', newToDo);
      setToDos((prevToDos) => [...prevToDos, response.data]);
      setNewToDo({ title: '', completed: false });
    } catch (error) {
      alert('Erro ao adicionar ToDo. Tente novamente.');
      console.error('Erro ao adicionar ToDo:', error);
    }
  };

  // Alternar o estado de conclusão de um ToDo
  const toggleCompletion = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };

    try {
      const response = await axios.put(`http://localhost:8000/api/todos/${id}/`, updatedTodo);
      setToDos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      alert('Erro ao atualizar o status do ToDo. Tente novamente.');
      console.error('Erro ao atualizar ToDo:', error);
    }
  };

  return (
    <div className="todos-container">
      <h1>Gerenciamento de ToDos</h1>

      {/* Exibe mensagem de erro, se houver */}
      {error && <p className="error-message">{error}</p>}

      {/* Formulário para adicionar um novo ToDo */}
      <div className="form">
        <input
          type="text"
          placeholder="Digite o título do ToDo"
          value={newToDo.title}
          onChange={(e) => setNewToDo({ ...newToDo, title: e.target.value })}
          className="input-field"
        />
        <button onClick={handleAddToDo} className="add-button">
          Adicionar ToDo
        </button>
      </div>

      {/* Exibe uma mensagem de carregamento enquanto busca os ToDos */}
      {loading && <p>Carregando ToDos...</p>}

      {/* Lista de ToDos */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <div
              className="todo-details"
              onClick={() => toggleCompletion(todo.id)}
            >
              <span className="todo-title">{todo.title}</span>
              <span className="todo-status">
                {todo.completed ? '✔ Concluído' : '⏳ Pendente'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDos;
