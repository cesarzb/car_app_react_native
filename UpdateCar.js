import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { API_URL, API_VERSION } from "./constants";
import { useNavigation, useRoute } from "@react-navigation/native";

const UpdateCar = () => {
  const [model, setModel] = useState("");
  const [seats, setSeats] = useState("5");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("10");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { carId } = route.params;

  const handleSubmit = () => {
    const carData = {
      car: {
        model,
        seats: Number(seats),
        price: Number(price),
        brand_name: brand,
      },
    };

    fetch(API_URL + API_VERSION + `/cars/${carId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    })
      .then((response) => response.json())
      .then(() => {
        navigation.navigate("Layout", { carId });
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL + API_VERSION + `/cars/${carId}`, {})
      .then((response) => response.json())
      .then((payload) => {
        setModel(payload.model);
        setSeats(payload.seats.toString());
        setBrand(payload.brand.name);
        setPrice(payload.price.toString());
        setIsLoading(false);
      });
  }, [carId]);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View style={{ padding: 16 }}>
      <Text>Car model</Text>
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

      <Text>Car brand</Text>
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

      <Text>Car seats</Text>
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

      <Text>Car price</Text>
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

      <Button title="Submit" onPress={handleSubmit} />

      <TouchableOpacity
        onPress={() => navigation.navigate("CarDetails", { carId })}
        style={{ marginTop: 16 }}
      >
        <Text style={{ color: "blue", fontSize: 16 }}>Back to car</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateCar;
