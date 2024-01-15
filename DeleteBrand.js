import React from "react";
import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL, API_VERSION } from "./constants";
import useAuth from "./useAuth";

const DeleteBrand = ({ brandId }) => {
  const navigation = useNavigation();
  const { auth } = useAuth();

  const handleSubmit = async () => {
    if (auth.accessToken) {
      try {
        const response = await fetch(
          `${API_URL}${API_VERSION}/brands/${brandId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: auth.accessToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          navigation.navigate("Layout");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Button title="Delete brand" onPress={handleSubmit} />
    </View>
  );
};

export default DeleteBrand;
