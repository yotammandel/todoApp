import React, { useState } from "react";
import { TextInput, StyleSheet, Pressable, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { addTask } from "../api";

export default function AddTask({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const onPress = async () => {
    if (newTask.trim() !== "") {
      try {
        const taskObj = {
          text: newTask,
          completed: false,
        };
        const addedTask = await addTask(taskObj);
        onAddTask(addedTask); 
        setNewTask("");
      } catch (error) {
        Alert.alert("Error", "Failed to add task. Please try again.");
        console.error("Error adding task:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type your task..."
        placeholderTextColor="#646464"
        style={isFocused ? styles.searchFocused : styles.search}
        onChangeText={setNewTask}
        value={newTask}
        onFocus={() => setIsFocused(true)}  
        onBlur={() => setIsFocused(false)} 
      />
      <Pressable style={styles.button} onPress={onPress}>
        <Text><AntDesign name="pluscircleo" size={17} color="white" /></Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 160,
  },
  search: {
    backgroundColor: "#333333",
    color: "#f2f2f2",
    width: "75%",
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchFocused: {
    backgroundColor: "#333333",
    color: "#f2f2f2",
    width: "75%",
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#5E60CE',  // Choose a noticeable color when focused
    borderWidth: 1,       // Set border width
  },
  button: {
    margin: 5,
    backgroundColor: "rgb(30, 111, 159)",
    height: 50,
    width: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
