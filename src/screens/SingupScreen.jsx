import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SubmitButton from "../components/SubmitButtom/submitButtom";
import InputForm from "../components/InputForm/inputForm";
import { useSignUpMutation } from "../services/authServices.js"; 
import { setUser } from "../features/User/userSlice.js";
import { signupSchema } from "../validations/authSchema.js";

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

    const dispatch = useDispatch()

    const [triggerSignUp, result] = useSignUpMutation()

    useEffect(() => {
        if (result.isSuccess) {
            dispatch(
                setUser({
                    email: result.data.email,
                    idToken: result.data.idToken
                })
            );
    
            Alert.alert(
                "Success",
                "Registration successful"
            );
        }
    }, [result]);    

    const onSubmit = () => {
        try {
            setErrorMail("")
            setErrorPassword("")
            setErrorConfirmPassword("")
            const validation = signupSchema.validateSync({email, password, confirmPassword})
            triggerSignUp({email, password, returnSecureToken: true})
        } catch (err) {
            console.log("Entro al signup del error");
            console.log(err.path);
            console.log(err.message);
            switch (err.path) {
                case "email":
                    setErrorMail(err.message)
                    break;
                case "password":
                    setErrorPassword(err.message)
                    break;
                case "confirmPassword":
                    setErrorConfirmPassword(err.message)
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
                <Text style={styles.title}>Signup</Text>
                <View style={styles.form}>
                    <InputForm label={"email"} onChange={setEmail} error={errorMail} />
                    <InputForm
                        label={"password"}
                        onChange={setPassword}
                        error={errorPassword}
                        isSecure={true}
                    />
                    <InputForm
                        label={"confirm password"}
                        onChange={setconfirmPassword}
                        error={errorConfirmPassword}
                        isSecure={true}
                    />
                </View>
                <SubmitButton onPress={onSubmit} title="Send" />
                <Text style={styles.sub}>Already have an account?</Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.subLink}>Login</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default SignupScreen;

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
