import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import InputForm from "../components/InputForm/inputForm";
import SubmitButton from "../components/SubmitButtom/submitButtom";
import { useSignInMutation } from "../services/authServices.js";
import { setUser } from "../features/User/userSlice.js";
import { useDispatch } from "react-redux";
import { loginSchema } from "../validations/authSchema.js";
import { insertSession } from "../persistence/index.js";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [triggerSignIn, result] = useSignInMutation();

  useEffect(() => {
    if (result?.data && result.isSuccess) {
        insertSession({
            email: result.data.email,
            localId: result.data.localId,
            token: result.data.idToken,
        })
            .then((response) => {
                dispatch(
                    setUser({
                        email: result.data.email,
                        idToken: result.data.idToken,
                        localId: result.data.localId,
                    })
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }
}, [result])

  const onSubmit = () => {
    setErrorMail("");
    setErrorPassword("");

    try {
      const validation = loginSchema.validateSync({ email, password });
      triggerSignIn({ email, password });
    } catch (err) {
      console.log("Login error caught:");
      console.log(err.path);
      console.log(err.message);
      switch (err.path) {
        case "email":
          setErrorMail(err.message);
          break;
        case "password":
          setErrorPassword(err.message);
          break;
        default:
          break;
      }
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.titleApp}>Big Food</Text>
        <Text style={styles.title}>Login to start</Text>
        <View style={styles.form}>
          <InputForm label={"email"} value={email} onChange={setEmail} error={errorMail} />
          <InputForm
            label={"password"}
            value={password}
            onChange={setPassword}
            error={errorPassword}
            isSecure={true}
          />
        </View>
        <SubmitButton onPress={onSubmit} title="Login" />
        <Text style={styles.sub}>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.subLink}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "red",
  },
  titleApp: {
    fontSize: 40,
    color: "red",
    fontWeight: "bold",
  },
  title: {
    fontSize: 22,
    color: "#333",
  },
  form: {
    width: "90%",
    marginVertical: 10,
  },
  sub: {
    fontSize: 14,
    color: "#333",
  },
  subLink: {
    fontSize: 16,
    color: "blue",
  },
});
