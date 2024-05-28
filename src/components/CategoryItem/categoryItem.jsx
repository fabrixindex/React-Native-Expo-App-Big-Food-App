import React from "react";
import { Pressable, StyleSheet, Text, ImageBackground } from "react-native";
import Card from "../Card/Card";
import { useDispatch } from "react-redux";
import { setCategorySelected } from "../../features/Shop/shopSlice.js";

const CategoryItem = ({ category, navigation }) => {
  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(setCategorySelected(category));
    navigation.navigate("ItemListCategory", { category });
  };

  // Mapear categorías a imágenes
  const getImageSource = (category) => {
    switch (category) {
      case "Burgers":
        return require("../../../assets/images/burgers.jpg");
      case "Pizzas":
        return require("../../../assets/images/pizzas.jpg");
      case "Milanesas":
        return require("../../../assets/images/milanesas.jpg");
      case "Beverages":
        return require("../../../assets/images/beverages.png");
      default:
        return require("../../../assets/images/Product_sin_imagen_disponible.jpg");
    }
  };

  return (
    <Pressable onPress={handleNavigate}>
      <Card>
        <ImageBackground
          source={getImageSource(category)}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <Text style={styles.text}>{category}</Text>
        </ImageBackground>
      </Card>
    </Pressable>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  imageBackground: {
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20, 
    overflow: "hidden",
  },
});
