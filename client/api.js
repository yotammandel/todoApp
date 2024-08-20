import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.174:5000/api",
  timeout: 10000,
});

export const testAPIConnection = async () => {
  try {
    console.log("Testing API connection...");
    const response = await api.get("todos/test");
    console.log("API test successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("API test failed:", error);
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const response = await api.get("/todos");
    console.log("Tasks fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    if (error.response && error.response.status === 404) {
      return [];
    }
    throw error;
  }
};

export const addTask = async (title) => {
  try {
    const response = await api.post("/todos/", { title });
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error.message);
    throw error;
  }
};

export const updateTask = async (id, updates) => {
  try {
    const response = await api.patch(`/todos/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error.message);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    await api.delete(`/todos/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error.message);
    throw error;
  }
};
