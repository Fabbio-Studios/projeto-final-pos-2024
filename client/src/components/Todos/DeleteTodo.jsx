import React from 'react';

const DeleteTodo = ({ todoId, onDelete }) => {
  const handleDelete = () => {
    fetch(`https://example.com/api/todos/${todoId}/`, {
      method: 'DELETE',
    })
      .then(() => onDelete(todoId))
      .catch((error) => console.error('Error deleting todo:', error));
  };

  return <button onClick={handleDelete}>Delete Todo</button>;
};

export default DeleteTodo;
