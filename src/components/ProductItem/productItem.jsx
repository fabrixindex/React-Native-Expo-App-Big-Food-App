import { ImageBackground, StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import Card from "../Card/Card";
import { useDispatch } from "react-redux";
import { setIdSelected } from "../../features/Shop/shopSlice.js";

const ProductItem = ({ product, setProductSelected = () => {}, navigation }) => {
  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(setIdSelected(product.title));
    navigation.navigate("ItemDetail", { productId: product.id });
  };

  const backgroundImage = product.images.length > 0 ? { uri: product.images[0] } : require("../../../assets/images/Product_sin_imagen_disponible.jpg");

  return (
    <Pressable
      style={styles.pressable}
      onPress={handleNavigate}
    >
      <Card style={[styles.additionalStylesCard ]}>
        <ImageBackground
          source={backgroundImage}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <Text style={styles.textProduct}>{product.title}</Text>
        </ImageBackground>
      </Card>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  additionalStylesCard: {
    height: 140,
    width: "100%",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "black",
    overflow: "hidden", // Para que los bordes redondeados se vean correctamente
  },
  textProduct: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: "center",
  },
  pressable: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
