import React from "react";
import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL, API_VERSION } from "./constants";

const DeleteCar = ({ carId }) => {
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await fetch(API_URL + API_VERSION + `/cars/${carId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        navigation.navigate("CarsList");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <View style={{ marginTop: 16 }}>
      <Button title="Delete car" onPress={handleSubmit} />
    </View>
  );
};

export default DeleteCar;
