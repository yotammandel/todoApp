import axios from 'axios';

const API_URL = 'http://locallHost:5000/api';

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const addTask = async (title) => {
  try {
    const response = await axios.post(`${API_URL}/todos`, { title });
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const updateTask = async (id, updates) => {
  try {
    const response = await axios.patch(`${API_URL}/todos/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/todos/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};