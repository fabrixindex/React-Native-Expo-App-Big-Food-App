import React, { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useGetProductByIdQuery } from "../services/shopServices";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/Cart/cartSlice";
import GoBackButton from "../components/GoBackNavigation/goBackNavigation";

const ItemDetail = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [orientation, setOrientation] = useState("portrait");
  const { width, height } = useWindowDimensions();

  const { productId: idSelected } = route.params;

  const { data: product, error, isLoading } = useGetProductByIdQuery(idSelected);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (width > height) setOrientation("landscape");
    else setOrientation("portrait");
  }, [width, height]);

  const handleAddCart = () => {
    setIsButtonDisabled(true);
    dispatch(addCartItem({ ...product, quantity: 1 }));
    setShowAddedToCart(true);
    setTimeout(() => {
      setShowAddedToCart(false);
      setIsButtonDisabled(false);
    }, 3000); 
  };

  return (
    <View style={styles.containerItemDetail}>
      <GoBackButton navigation={navigation} />
      {product ? (
        <View
          style={
            orientation === "portrait"
              ? styles.mainContainer
              : styles.mainContainerLandscape
          }
        >
          <View
            style={
              orientation === "portrait"
                ? styles.textContainer
                : styles.textContainerLandscape
            }
          >
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Pressable
              onPress={handleAddCart}
              style={[styles.addToCartButton, isButtonDisabled && styles.disabledButton]}
              disabled={isButtonDisabled}
            >
              <Text style={styles.addToCartButtonText}>
                {showAddedToCart ? "Product Added To Cart" : "Add to Cart"}
              </Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  containerItemDetail: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center"
  },
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  mainContainerLandscape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    gap: 10,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  textContainerLandscape: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addToCartButton: {
    width: '100%',
    backgroundColor: "red",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});
