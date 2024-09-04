import axios from "axios";
import { BASEURL } from "@env";

const api = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});

export const testAPIConnection = async () => {
  try {
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
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
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
    console.log(`Updating task with ID: ${id}, Updates:`, updates);
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
