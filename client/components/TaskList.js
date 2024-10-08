import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Task from "./Task";
import { updateTask, deleteTask } from "../api";

export default function TaskList({ tasks, setTasks }) {
  const [openCount, setOpenCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);

  useEffect(() => {
    setOpenCount(tasks.filter((task) => !task.completed).length);
    setClosedCount(tasks.filter((task) => task.completed).length);
  }, [tasks]);

  const handleToggle = async (id, completed) => {
    try {
      const updatedTask = await updateTask(id, { completed });
      const updatedTasks = tasks.map((task) => {
        if (task._id === id) {
          return updatedTask;
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error toggling task:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const handleEdit = async (id, newTitle) => {
    try {
      const updatedTask = await updateTask(id, { title: newTitle });
      const updatedTasks = tasks.map((task) => {
        if (task._id === id) {
          return { ...task, title: newTitle };
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error editing task:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.counters}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{ color: "#8284fa", marginRight: 7, fontWeight: "bold" }}
          >
            Done
          </Text>
          <View style={styles.count}>
            <Text style={{ color: "white" }}>{closedCount}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{ color: "#4EA8DE", marginRight: 7, fontWeight: "bold" }}
          >
            Open
          </Text>
          <View style={styles.count}>
            <Text style={{ color: "white" }}>{openCount}</Text>
          </View>
        </View>
      </View>
      {tasks.length === 0 ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 200,
          }}
        >
          <Image
            source={require("../assets/clipboard.png")}
            style={styles.logo}
          />
          <Text
            style={{
              color: "#434343",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            You don't have tasks registered yet
          </Text>
          <Text
            style={{ color: "#434343", fontSize: 16, fontWeight: "normal" }}
          >
            Create tasks and organize your to-do items
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.tasksContainer}>
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#262626",
    position: "absolute",
    top: 260,
  },
  counters: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#7F7F7F",
    paddingBottom: 15,
  },
  count: {
    borderRadius: 13,
    backgroundColor: "#333333",
    width: 32,
    height: 22,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tasksContainer: {
    backgroundColor: "#262626",
    width: "90%",
    height: 550,
    borderRadius: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
});
