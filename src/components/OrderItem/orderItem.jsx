import { StyleSheet, Text, View, Modal, Pressable, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";

const OrderItem = ({ order }) => {
    const total = order.items.reduce(
        (acc, currentItem) => acc + currentItem.price * currentItem.quantity,
        0
    );

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View style={styles.card}>
            <View style={styles.textContainer}>
                <Text style={styles.dateText}>
                    {new Date(order?.createdAt || null).toLocaleString()}
                </Text>
                <Text style={styles.totalText}>${total.toFixed(2)}</Text>
            </View>
            <Pressable onPress={toggleModal}>
                <Feather name="search" size={30} color="#333" />
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ScrollView contentContainerStyle={styles.modalContent}>
                                <Text style={styles.orderTitle}>Your Order</Text>
                                <Text style={styles.orderModalText}>Date: {new Date(order?.createdAt || null).toLocaleString()}</Text>
                                <Text style={styles.orderModalText}>Total: ${total.toFixed(2)}</Text>
                                <Text style={styles.orderModalText}>Items:</Text>
                                {order.items.map((item, index) => (
                                    <Text key={index} style={styles.orderModalText}>
                                        {item.quantity} x {item.title} - ${item.price.toFixed(2)}
                                    </Text>
                                ))}
                            </ScrollView>
                            <Pressable onPress={toggleModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    card: {
        height: 110,
        backgroundColor: "#f9f9f9",
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    textContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    dateText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 5,
    },
    totalText: {
        fontSize: 18,
        color: "#333",
        fontWeight: "bold",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        maxHeight: "50%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
    orderTitle: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 25,
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    orderModalText: {
        fontSize: 17,
        marginVertical: 5,
    },
    closeButton: {
        backgroundColor: "#2196F3",
        borderRadius: 25,
        padding: 15,
        paddingHorizontal: 30,
        elevation: 2,
        marginTop: 20,
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 17,
    },
});
