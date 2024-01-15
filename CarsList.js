import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { API_URL, API_VERSION } from "./constants";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const CarsList = () => {
  const { t } = useTranslation();

  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1); // Initial page
  const navigation = useNavigation();

  const fetchCars = (pageNumber) => {
    fetch(`${API_URL}${API_VERSION}/cars?page=${pageNumber}`)
      .then((response) => response.json())
      .then((payload) => setCars(payload));
  };

  useEffect(() => {
    fetchCars(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleCarClick = (id) => {
    navigation.navigate("CarDetails", { carId: id });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity
        style={{ backgroundColor: "blue", padding: 10, marginBottom: 16 }}
        onPress={() => navigation.navigate("CreateCar")}
      >
        <Text style={{ color: "white" }}>{t("Create a new car")}</Text>
      </TouchableOpacity>
      {cars.length > 0 && (
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: "lightgray",
                padding: 10,
                marginBottom: 8,
              }}
              onPress={() => handleCarClick(item.id)}
            >
              <Text style={{ fontWeight: "bold" }}>{item.model}</Text>
              <Text>{item.brand.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={{ backgroundColor: "blue", padding: 10, flex: 1 }}
          onPress={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <Text style={{ color: "white" }}>{t("Previous")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "blue", padding: 10, flex: 1 }}
          onPress={() => handlePageChange(page + 1)}
          disabled={cars.length < 12}
        >
          <Text style={{ color: "white" }}>{t("Next")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CarsList;
