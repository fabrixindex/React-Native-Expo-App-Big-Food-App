import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import React from "react"
import CartItem from "../components/CartItem/cartItem"
import { useSelector } from "react-redux"
import { usePostOrderMutation } from "../services/shopServices"

const Cart = () => {
    const {localId} = useSelector(state => state.auth.value)
    const { items: CartData, total } = useSelector((state) => state.cart.value);
    const [triggerPostOrder, result] = usePostOrderMutation()
    
    const onConfirmOrder = () => {
        triggerPostOrder({items: CartData, user: localId, total})
    }

    return (
        <View style={styles.container}>
            {CartData.length === 0 ? (
                <Text style={styles.emptyCartText}>Tu carrito está vacío</Text>
            ) : (
                <>
                    <FlatList
                        data={CartData}
                        keyExtractor={(x) => x.id}
                        renderItem={({ item }) => {
                            return <CartItem cartItem={item} />;
                        }}
                    />

                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total de su Compra: ${total}</Text>
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
