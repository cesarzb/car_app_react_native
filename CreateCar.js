import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { API_URL, API_VERSION } from "./constants";
import { useNavigation } from "@react-navigation/native";

const CreateCar = () => {
  const [model, setModel] = useState("");
  const [seats, setSeats] = useState("5");
  const [price, setPrice] = useState("10");
  const [brand, setBrand] = useState("");

  const navigation = useNavigation();

  const handleSubmit = () => {
    const carData = {
      car: {
        model,
        seats: Number(seats),
        price: Number(price),
        brand_name: brand,
      },
    };

    fetch(API_URL + API_VERSION + `/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    })
      .then((response) => response.json())
      .then((payload) => {
        console.log("payload");
        console.log(payload);
        navigation.navigate("Layout");
      });
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ marginBottom: 8 }}>Car model</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 16,
        }}
        value={model}
        onChangeText={(text) => setModel(text)}
      />

      <Text style={{ marginBottom: 8 }}>Car brand</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 16,
        }}
        value={brand}
        onChangeText={(text) => setBrand(text)}
      />

      <Text style={{ marginBottom: 8 }}>Car price</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 16,
        }}
        value={price}
        onChangeText={(text) => setPrice(text)}
      />

      <Text style={{ marginBottom: 8 }}>Car seats</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 16,
        }}
        value={seats}
        onChangeText={(text) => setSeats(text)}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default CreateCar;
