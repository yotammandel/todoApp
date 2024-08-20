import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Task({ task, onDelete, onToggle }) {
  const [isChecked, setIsChecked] = useState(task.completed || false);

  useEffect(() => {
    setIsChecked(task.completed);
  }, [task.completed]);

  const toggleCheckbox = async () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    try {
      await onToggle(task._id, newCheckedState);
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else {
        console.error("Error message:", error.message);
      }
      setIsChecked(!newCheckedState);
    }
  };

  return (
    <View style={styles.container}>
      <Checkbox
        value={isChecked}
        style={styles.checkbox}
        onValueChange={toggleCheckbox}
      />
      <View
        style={[
          styles.text,
          { flexDirection: "row", flexWrap: "wrap", width: "70%" },
        ]}
      >
        <Text style={[styles.taskText, isChecked && styles.checkedText]}>
          {task.title}
        </Text>
      </View>
      <Pressable onPress={() => onDelete(task._id)}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={24}
          color="#7F7F7F"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#333333",
    padding: 10,
    margin: 5,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#7F7F7F",
    borderRadius: 10,
  },
  checkbox: {
    borderColor: "#4ca0d3",
    borderRadius: 15,
  },
  taskText: {
    color: "white",
    padding: 10,
    flex: 1,
  },
  checkedText: {
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
});
