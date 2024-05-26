import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'

const Header = () => {
  const {height, width} = useWindowDimensions()
  return (
    <View style = {styles.container}>
      <Text style = {width > 360 ? styles.text: styles.textSm}>Big Food App</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 34,
    color: 'white',
    fontWeight: "bold"
  },
  textSm: {
    fontSize: 24,
    color: 'white',
    fontWeight: "bold"
  }
})