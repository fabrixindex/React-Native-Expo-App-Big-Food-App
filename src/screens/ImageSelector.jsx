import React, { useState } from "react";
import { Alert, Image, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage } from "../features/User/userSlice";
import AddButton from "../components/AddButtom/addButtom";
import { usePostProfileImageMutation } from "../services/shopServices";
import Loader from "../components/Loader/loader";

const ImageSelector = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [triggerPostImage, { isLoading }] = usePostProfileImageMutation();
  const { localId } = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    return granted;
  };

  const pickImage = async () => {
    try {
      const permissionCamera = await verifyCameraPermissions();
      if (permissionCamera) {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          base64: true,
          quality: 0.2,
        });
        if (!result.canceled) {
          const image = `data:image/jpeg;base64,${result.assets[0].base64}`;
          setImage(image);
        }
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while picking the image.");
    }
  };

  const confirmImage = async () => {
    try {
      dispatch(setCameraImage(image));
      await triggerPostImage({ image, localId });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "An error occurred while confirming the image.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Profile Image</Text>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {image ? (
            <>
              <Image source={{ uri: image }} style={styles.image} />
              <AddButton title="Take another photo" onPress={pickImage} />
              <AddButton title="Confirm photo" onPress={confirmImage} />
            </>
          ) : (
            <>
              <View style={styles.noPhotoContainer}>
                <Text style={styles.noPhotoText}>No photo to show...</Text>
              </View>
              <AddButton title="Take a photo" onPress={pickImage} />
            </>
          )}
          <AddButton title="Cancel" onPress={() => navigation.goBack()} />
        </>
      )}
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  noPhotoContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  noPhotoText: {
    color: "#888",
  },
});
