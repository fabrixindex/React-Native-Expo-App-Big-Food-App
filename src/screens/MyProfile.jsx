import React, { useEffect } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import AddButton from "../components/AddButtom/addButtom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../services/shopServices.js";
import { clearUser } from "../features/User/userSlice.js"; 
import { truncateSessionsTable } from "../persistence/index.js";
import Loader from "../components/Loader/loader.jsx"; 
import { getSession } from '../persistence'

const MyProfile = ({ navigation }) => {
    const { imageCamera, localId } = useSelector(state => state.auth.value);
    const { data: imageFromBase, isLoading } = useGetProfileImageQuery(localId);

    const dispatch = useDispatch()

    const launchCamera = async () => {
        navigation.navigate('Image selector');
    };

    const signOut = async () => {
        try {
            const response = await truncateSessionsTable()
            dispatch(clearUser())
        } catch (error) {
            Alert.alert("Error", "An error occurred while signing out.");
        }
    }

    const defaultImageRoute = "../../assets/images/user-without-profile-photo.jpg";

    const {user} = useSelector(state => state.auth.value)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Profile</Text>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {imageFromBase || imageCamera ? (
                        <Image
                            source={{ uri: imageFromBase?.image || imageCamera }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    ) : (
                        <Image
                            source={require(defaultImageRoute)}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    )}
                    <Text style={styles.userEmail}>User: {user}</Text>
                    <AddButton onPress={launchCamera} title="Add profile picture" />
                    <AddButton onPress={signOut} title="Sign out" />
                </>
            )}
        </View>
    );
};

export default MyProfile;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#f9f9f9", 
        flex: 1, 
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333", 
        marginBottom: 20, 
    },
    image: {
        width: 150, 
        height: 150,
        borderRadius: 75, 
        borderWidth: 2, 
        borderColor: "#ccc", 
        marginBottom: 20, 
    },
    userEmail: {
        fontSize: 16,
        color: "#666", 
        marginTop: 10, 
        marginBottom: 20, 
    },
});
