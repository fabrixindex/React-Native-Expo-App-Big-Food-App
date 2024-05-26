import { StyleSheet, Platform, SafeAreaView, StatusBar } from "react-native"
import React from "react"
import Navigator from "./src/navigation/Navigator.jsx"
import { Provider } from "react-redux"
import store from "./src/store"

export default function App() {
  return (
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <Navigator/>
        </Provider>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    flex: 1
  },
})
