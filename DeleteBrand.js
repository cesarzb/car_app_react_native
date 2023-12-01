import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL, API_VERSION } from "./constants";

const DeleteBrand = ({ brandId }) => {
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        API_URL + API_VERSION + `/brands/${brandId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        navigation.navigate("BrandsList");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Button title="Delete brand" onPress={handleSubmit} />
    </View>
  );
};

export default DeleteBrand;
