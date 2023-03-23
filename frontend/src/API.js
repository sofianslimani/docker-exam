import axios from 'axios';

export const getTodos = async () => {
  //get todos from the server

  const request = await axios
    .get(`http://localhost:4001/todos`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      return response;
    });

  return request;
};

export const createTodo = async (formData) => {
  //create a todov on the server

  const request = await axios
    .post(`http://localhost:4001/todos`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      return response;
    });
};

export const deleteTodo = async (todoId) => {
  //delete a todo on the server

  const request = await axios
    .delete(`http://localhost:4001/todos/${todoId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      return response;
    });
};
