import axios from 'axios';

export const getUsers = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users');
};

export const createUser = (user) => {
  return axios.post('https://jsonplaceholder.typicode.com/users', user);
};

export const updateUser = (id, user) => {
  return axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
};

export const deleteUser = (id) => {
  return axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
};
