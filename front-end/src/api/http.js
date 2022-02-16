import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });

const http = {
  login: async ({ email, password }) => {
    try {
      console.log(email, password);
      const response = await api.post('/login', { email, password });
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
  createUser: async ({ name, email, password }) => {
    try {
      const response = await api.post('/new-user', { name, email, password });
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
  getAllTasks: async () => {
    try {
      const response = await api.get('/task');
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
  getTaskById: async (id) => {
    try {
      const response = await api.get(`/task/:${id}`);
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
  createTask: async ({ task, token }) => {
    try {
      const response = await api.post('/task', {
        data: { ...task },
        headers: { authorization: token },
      });
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
  editTask: async ({ task, token, id }) => {
    try {
      const response = await api.put(`task/${id}`, {
        data: { ...task },
        headers: { authorization: token },
      });
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
  deleteTask: async ({ id }) => {
    try {
      const response = await api.delete(`task/${id}`, {
        headers: { authorization: token },
      });
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
};

export default http;
