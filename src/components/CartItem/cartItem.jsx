import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { removeCartItem } from "../../features/Cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ cartItem }) => {
    
    const dispatch = useDispatch();

    const handleRemoveItem = () => {
        dispatch(removeCartItem({ id: cartItem.id }));
    };

    return (
        <TouchableOpacity style={styles.card} onPress={() => {}}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{cartItem.title}</Text>
                <Text style={styles.text}>Cantidad: {cartItem.quantity}</Text>
                <Text style={styles.text2}>${cartItem.price}</Text>
            </View>
            <Entypo name="trash" size={35} color="red" onPress={handleRemoveItem} />
        </TouchableOpacity>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#e0e0e0",
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
    },
    text2: {
        fontSize: 18,
    },
});
