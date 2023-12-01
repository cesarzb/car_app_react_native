import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { API_URL, API_VERSION } from "./constants";
import { useNavigation } from "@react-navigation/native";

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1); // Initial page

  const fetchCars = (pageNumber) => {
    fetch(`${API_URL}${API_VERSION}/cars?page=${pageNumber}`)
      .then((response) => response.json())
      .then((payload) => setCars(payload));
  };

  useEffect(() => {
    fetchCars(page);
  }, [page]);

  const navigation = useNavigation();

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <View style={{ padding: 16 }}>
      <TouchableOpacity onPress={() => navigation.navigate("CreateCar")}>
        <Text>Create a new car</Text>
      </TouchableOpacity>
      {cars.length > 0 ? (
        <>
          {cars.map((car) => (
            <View key={car.id} style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {car.model}
              </Text>
              <Text>{car.brand.name}</Text>
              <Text>Seats: {car.seats}</Text>
              <Text>Price: {car.price}$</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CarDetails", { carId: car.id })
                }
              >
                <Text style={{ color: "blue", fontSize: 16 }}>Show car</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button
              onPress={() => handlePageChange(page - 1)}
              title="Previous"
              disabled={page === 1}
            />
            <Button onPress={() => handlePageChange(page + 1)} title="Next" />
          </View>
        </>
      ) : (
        <>
          <Text>No cars to show :(</Text>
          {page !== 1 && (
            <Button
              onPress={() => handlePageChange(page - 1)}
              title="Previous"
              disabled={page === 1}
            />
          )}
        </>
      )}
    </View>
  );
};

export default CarsList;
