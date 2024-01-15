import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { API_URL, API_VERSION } from "./constants";
import DeleteCar from "./DeleteCar";
import { useTranslation } from "react-i18next";

const CarDetails = ({ route, navigation }) => {
  const { t } = useTranslation();

  const [car, setCar] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { carId } = route.params;

    fetch(`${API_URL}${API_VERSION}/cars/${carId}`, {})
      .then((response) => response.json())
      .then((payload) => {
        setCar(payload);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{car.model}</Text>
          <Text>{car?.brand?.name}</Text>
        </View>
      </View>
      <View style={{ marginTop: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontWeight: "bold" }}>
              {t("Seats")}: {car.seats}
            </Text>
            <Text>
              {t("Price")}: {Number(car.price).toFixed(2)}$
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <TouchableOpacity
            style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}
            onPress={() => navigation.navigate("CarsList")}
          >
            <Text style={{ color: "white" }}>{t("Back to cars list")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}
            onPress={() => navigation.navigate("UpdateCar", { carId: car.id })}
          >
            <Text style={{ color: "white" }}>{t("Edit car")}</Text>
          </TouchableOpacity>
          <DeleteCar carId={car.id} />
        </View>
      </View>
    </View>
  );
};

export default CarDetails;
