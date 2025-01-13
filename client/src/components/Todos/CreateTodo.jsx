import React, { useState } from 'react';

const CreateTodo = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = { title, completed };

    fetch('https://example.com/api/todos/', {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((todo) => onCreate(todo))
      .catch((error) => console.error('Error creating todo:', error));

    setTitle('');
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Todo Title"
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
      <button type="submit">Create Todo</button>
    </form>
  );
};

export default CreateTodo;
