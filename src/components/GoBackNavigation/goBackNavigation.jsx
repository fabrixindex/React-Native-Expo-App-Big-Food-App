import { StyleSheet, View, Button, Pressable, Text } from "react-native"
import React from "react"

const GoBackButton = ({ navigation }) => {
  return (
    <Pressable style={styles.button} onPress={() => navigation.goBack()} title="Go back" >
      <Text style={styles.text}>Go Back</Text>
    </Pressable>
  )
}

export default GoBackButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF6347",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    width: '60%',
    marginVertical: 5,
  },
  text: {
    color: "white",
    fontSize: 22
  },
})
