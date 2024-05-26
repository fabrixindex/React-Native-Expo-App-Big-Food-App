import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

const AddButton = ({ title = "", onPress = () => {} }) => {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

export default AddButton;

const styles = StyleSheet.create({
    button: {
        width: "80%",
        backgroundColor: "#FF6347", 
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, 
        marginVertical: 10,
    },
    text: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
});
