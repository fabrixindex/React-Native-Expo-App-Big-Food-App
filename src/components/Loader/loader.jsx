import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

const Loader = () => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#FF0000" />
        </View>
    );
};

export default Loader;

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
});
