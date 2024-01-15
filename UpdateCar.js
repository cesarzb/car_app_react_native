import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_URL, API_VERSION } from "./constants";
import { useTranslation } from "react-i18next";

const UpdateCar = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { carId } = route.params;

  const [model, setModel] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [modelTouched, setModelTouched] = useState(false);
  const [priceTouched, setPriceTouched] = useState(false);
  const [seatsTouched, setSeatsTouched] = useState(false);
  const [brandTouched, setBrandTouched] = useState(false);
  const [modelValid, setModelValid] = useState(false);
  const [seatsValid, setSeatsValid] = useState(false);
  const [priceValid, setPriceValid] = useState(false);
  const [brandValid, setBrandValid] = useState(true);
  const [carValid, setCarValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => setModelValid(model.length > 0), [model]);
  useEffect(() => setSeatsValid(Number(seats) > 0), [seats]);
  useEffect(() => setPriceValid(Number(price) > 0), [price]);
  useEffect(() => setBrandValid(true), [brand]);
  useEffect(
    () => setCarValid(modelValid && seatsValid && priceValid),
    [price, model, seats]
  );

  const modelChange = (text) => {
    setModel(text);
    setModelTouched(true);
  };

  const seatsChange = (text) => {
    setSeats(text);
    setSeatsTouched(true);
  };

  const priceChange = (text) => {
    setPrice(text);
    setPriceTouched(true);
  };

  const brandChange = (text) => {
    setBrand(text);
    setBrandTouched(true);
  };

  const handleSubmit = () => {
    if (carValid) {
      const carData = {
        car: {
          model,
          seats: Number(seats),
          price: Number(price),
          brand_name: brand,
        },
      };

      fetch(`${API_URL}${API_VERSION}/cars/${carId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json();
          } else {
            navigation.replace("Cars"); // Assuming 'Cars' is the name of the screen in your navigation stack
          }
        })
        .then(() => {
          setBrandValid(false);
          setBrandTouched(false);
        });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}${API_VERSION}/cars/${carId}`, {})
      .then((response) => response.json())
      .then((payload) => {
        setModel(payload.model);
        setSeats(payload.seats);
        setBrand(payload.brand.name);
        setPrice(payload.price);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View style={{ padding: 16 }}>
      <View>
        <Text>{t("Car model")}</Text>
        {modelTouched && !modelValid && (
          <Text style={{ color: "red" }}>{t("Car model must be present")}</Text>
        )}
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 16,
          }}
          value={model}
          onChangeText={modelChange}
        />
      </View>
      <View>
        <Text>{t("Car brand")}</Text>
        {!brandTouched && !brandValid && (
          <Text style={{ color: "red" }}>{t("Car brand must exist")}</Text>
        )}
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 16,
          }}
          value={brand}
          onChangeText={brandChange}
        />
      </View>
      <View>
        <Text>{t("Car seats")}</Text>
        {seatsTouched && !seatsValid && (
          <Text style={{ color: "red" }}>
            {t("Car has to have at least 1 seat")}
          </Text>
        )}
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 16,
          }}
          value={seats}
          onChangeText={seatsChange}
        />
      </View>
      <View>
        <Text>{t("Car price")}</Text>
        {priceTouched && !priceValid && (
          <Text style={{ color: "red" }}>
            {t("Car price must be greater than 0")}
          </Text>
        )}
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 16,
          }}
          value={price}
          onChangeText={priceChange}
        />
      </View>
      <View style={{ marginTop: 16 }}>
        <Button title={t("Submit")} onPress={handleSubmit} />
        <Link to={`/cars/${carId}`} style={{ marginTop: 16 }}>
          <Text>{t("Back to car")}</Text>
        </Link>
      </View>
    </View>
  );
};

export default UpdateCar;
