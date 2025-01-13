import React, { useEffect, useState } from 'react';
import DeleteTodo from './DeleteTodo';
import UpdateTodo from './UpdateTodo';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://example.com/api/todos/')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  const handleDelete = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  return (
    <div>
      <h2>Todos List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div>{todo.title} - {todo.completed ? 'Completed' : 'Pending'}</div>
            <UpdateTodo todoId={todo.id} />
            <DeleteTodo todoId={todo.id} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTodos;
