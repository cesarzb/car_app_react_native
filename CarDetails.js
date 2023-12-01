import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_URL, API_VERSION } from "./constants";
import DeleteCar from "./DeleteCar";

const CarDetails = () => {
  const [car, setCar] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { carId } = route.params;

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL + API_VERSION + `/cars/${carId}`, {})
      .then((response) => response.json())
      .then((payload) => {
        setCar(payload);
        setIsLoading(false);
      });
  }, [carId]);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Model: {car.model}
        </Text>
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text>Seats: {car.seats}</Text>
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text>Brand: {car?.brand?.name}</Text>
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text>Price: {car.price}$</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("UpdateCar", { carId: car.id })}
        style={{ marginBottom: 16 }}
      >
        <Text style={{ color: "blue", fontSize: 16 }}>Edit car</Text>
      </TouchableOpacity>
      <DeleteCar carId={carId} />
      <TouchableOpacity
        onPress={() => navigation.navigate("CarsList")}
        style={{ marginTop: 16 }}
      >
        <Text style={{ color: "blue", fontSize: 16 }}>Back to cars list</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CarDetails;
