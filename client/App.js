import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, StatusBar } from "react-native";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import { getTasks } from "./api";
import { BASEURL } from "@env";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  return (
    <View style={styles.fullContainer}>
      <View style={styles.blackBackground} />
      <View style={styles.grayBackground} />
      <View style={styles.container}>
        <Image source={require("./assets/logo.png")} style={styles.logo} />
        <AddTask onAddTask={handleAddTask} />
        <TaskList setTasks={setTasks} tasks={tasks} />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  blackBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: "black",
  },
  grayBackground: {
    position: "absolute",
    top: 190,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#262626",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  logo: {
    width: 165,
    height: 45,
    position: "absolute",
    top: 80,
    marginBottom: 50,
  },
});
