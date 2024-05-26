import { StyleSheet, View, Button } from "react-native"
import React from "react"

const GoBackButton = ({ navigation }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button onPress={() => navigation.goBack()} title="Go back" color="#841584" />
    </View>
  )
}

export default GoBackButton

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
  }
})
