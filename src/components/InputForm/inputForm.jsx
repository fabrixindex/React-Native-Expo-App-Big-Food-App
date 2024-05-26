import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const InputForm = ({
    label, 
    onChange, 
    error = "",
    isSecure = false
}) => {
    const [input, setInput] = useState("");
    const onChangeText = (text) => {
        setInput(text)
        onChange(text)
    }
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.subtitle}>{label}</Text>
      <TextInput
        style ={styles.input}
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        placeholder={label}
        placeholderTextColor="#888"
      />
      {error ? 
        <Text style = {styles.error}>
            {error}
        </Text>
        :
        null
    }
    </View>
  )
}

export default InputForm

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    subtitle: {
        width: '90%',
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    error: {
        paddingTop: 2,
        fontSize: 16,
        color: 'red',
        width: '90%',
    },
    input: {
        width: '90%',
        borderWidth: 1,
        borderColor: 'red',
        padding: 10,
        fontSize: 14,
        borderRadius: 5,
        backgroundColor: 'white',
    }
})