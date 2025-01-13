import React, { useState, useEffect } from 'react';

const UpdateTodo = ({ todoId }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetch(`https://example.com/api/todos/${todoId}/`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setCompleted(data.completed);
      })
      .catch((error) => console.error('Error fetching todo for update:', error));
  }, [todoId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTodo = { title, completed };

    fetch(`https://example.com/api/todos/${todoId}/`, {
      method: 'PUT',
      body: JSON.stringify(updatedTodo),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((todo) => {
        setTitle(todo.title);
        setCompleted(todo.completed);
      })
      .catch((error) => console.error('Error updating todo:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Completed
      </label>
      <button type="submit">Update Todo</button>
    </form>
  );
};

export default UpdateTodo;
