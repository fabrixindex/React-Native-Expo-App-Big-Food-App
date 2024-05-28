import { StyleSheet, View } from 'react-native'
import React from 'react'

const Card = ({children, style }) => {
  return (
    <View style={[styles.cardCategory, style, styles.additionalStylesCard]}>
        {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  cardCategory: {
    backgroundColor: "#ffcccb", 
    borderRadius: 20,
    marginVertical: 13,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "column",
    justifyContent: "flex-end",
  }
})
