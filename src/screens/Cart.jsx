import { FlatList, Pressable, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import CartItem from "../components/CartItem/cartItem";
import Loader from "../components/Loader/loader"; 
import { useSelector, useDispatch } from "react-redux";
import { usePostOrderMutation } from "../services/shopServices";
import { clearCart, confirmOrder } from "../features/Cart/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const { localId } = useSelector(state => state.auth.value);
    const { items: CartData, total } = useSelector((state) => state.cart.value);
    const [triggerPostOrder] = usePostOrderMutation();
    const [isConfirming, setIsConfirming] = useState(false);
    
    const onConfirmOrder = async () => {
        setIsConfirming(true);
        dispatch(confirmOrder());
        
        const order = {
            items: CartData,
            user: localId,
            total,
            createdAt: new Date().toISOString(), 
        };
        
        await triggerPostOrder(order);
        dispatch(clearCart());
        setIsConfirming(false);
        Alert.alert("Order Confirmed", "Your purchase has been completed successfully.");
    };

    return (
        <View style={styles.container}>
            {isConfirming ? (
                <Loader />
            ) : CartData.length === 0 ? (
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
            ) : (
                <>
                    <FlatList
                        data={CartData}
                        keyExtractor={(x) => x.id}
                        renderItem={({ item }) => <CartItem cartItem={item} />}
                    />

                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
                        <Pressable onPress={onConfirmOrder} style={styles.confirmButton}>
                            <Text style={styles.confirmText}>Confirm</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flex: 1,
        marginBottom: 120,
    },
    totalContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
    },
    totalText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
    },
    confirmButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
    },
    confirmText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    emptyCartText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
});
