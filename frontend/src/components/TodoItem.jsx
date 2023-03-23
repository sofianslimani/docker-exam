import React from 'react';

const Todo = ({ todo, deleteTodo }) => {
  return (
    <div className="Card">
      <div className="Card--text">
        <h1>{todo.name}</h1>
        <span>{todo.description}</span>
      </div>
      <div className="Card--button">
        <button
          onClick={() => deleteTodo(todo.id)}
          className="Card--button__delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
