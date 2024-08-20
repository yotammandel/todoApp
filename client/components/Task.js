import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable} from "react-native";
import Checkbox from "expo-checkbox";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function Task({ task, onToggle, onDelete }) {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
        onToggle(task.id, !isChecked); 
    };

    const handleDelete = () => {
        onDelete(task.id);
    };

    return (
        <View style={styles.container}>
            <Checkbox value={isChecked} style={styles.checkbox} onValueChange={toggleCheckbox} />
            <View style={[styles.text, { flexDirection: 'row', flexWrap: 'wrap', width: '70%' }]}>
                <Text style={[styles.taskText, isChecked && styles.checkedText]}>{task.text}</Text>
            </View>
            <Pressable onPress={handleDelete} style={{alignSelf: 'flex-start'}}>
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
        minHeight: 70, // Ensures the container has a minimum height
    },
    checkbox: {
        borderColor: "#4ca0d3",
        borderRadius: 15,
        alignSelf: 'flex-start'
    },
    taskText: { // This style was adjusted to handle text settings
        color: 'white',
        padding: 10,
        flex: 1
    },
    checkedText: {
        textDecorationLine: "line-through", // Style for line-through text
        opacity: 0.5,
    },
});
