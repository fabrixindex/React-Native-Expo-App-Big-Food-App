import { Pressable, StyleSheet, Text } from "react-native"
import React from "react"
import Card from "../Card/Card"
import {useDispatch} from 'react-redux'
import { setCategorySelected } from "../../features/Shop/shopSlice.js"

const CategoryItem = ({ category, navigation }) => {

  const dispatch = useDispatch()

  const handleNavigate = () => {
    dispatch(setCategorySelected(category))
    navigation.navigate('ItemListCategory', {category})
  }

  return (
    <Pressable onPress={handleNavigate}>
      <Card>
          <Text style={styles.text}>{category}</Text>
      </Card>
    </Pressable>
);
};

export default CategoryItem

const styles = StyleSheet.create({
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    textShadowColor: '#000', 
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 1, 
  },
})