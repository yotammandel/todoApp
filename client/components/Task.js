import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import Checkbox from "expo-checkbox";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MAX_TITLE_LENGTH = 30; // Adjust this value as needed

export default function Task({ task, onDelete, onToggle, onEdit }) {
  const [isChecked, setIsChecked] = useState(task.completed || false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsChecked(task.completed);
    setEditedTitle(task.title);
  }, [task.completed, task.title]);

  const toggleCheckbox = async () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    try {
      await onToggle(task._id, newCheckedState);
    } catch (error) {
      console.error("Error toggling task:", error);
      setIsChecked(!newCheckedState);
    }
  };

  const handleLongPress = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = () => {
    onEdit(task._id, editedTitle);
    setIsEditing(false);
  };

  const toggleExpand = () => {
    if (task.title.length > MAX_TITLE_LENGTH) {
      setIsExpanded(!isExpanded);
    }
  };

  const renderTaskTitle = () => {
    if (isEditing) {
      return (
        <TextInput
          style={styles.input}
          value={editedTitle}
          onChangeText={setEditedTitle}
          onBlur={handleEditSubmit}
          autoFocus
          multiline
        />
      );
    }

    if (task.title.length <= MAX_TITLE_LENGTH || isExpanded) {
      return (
        <Text style={[styles.taskText, isChecked && styles.checkedText]}>
          {task.title}
        </Text>
      );
    }

    return (
      <Text style={[styles.taskText, isChecked && styles.checkedText]}>
        {`${task.title.substring(0, MAX_TITLE_LENGTH)}... `}
        <Text style={styles.readMore}>Read more</Text>
      </Text>
    );
  };

  return (
    <Pressable
      onLongPress={handleLongPress}
      onPress={toggleExpand}
      style={styles.container}
    >
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
        {renderTaskTitle()}
      </View>
      <Pressable onPress={() => onDelete(task._id)}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={24}
          color="#7F7F7F"
        />
      </Pressable>
    </Pressable>
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
  input: {
    flex: 1,
    color: "white",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#4ca0d3",
  },
  readMore: {
    color: "#4ca0d3",
    fontWeight: "bold",
  },
});
