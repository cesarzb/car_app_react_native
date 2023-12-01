import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_URL, API_VERSION } from "./constants";

const UpdateBrand = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("5");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { brandId } = route.params;

  const handleSubmit = () => {
    const brandData = {
      brand: {
        name,
        year,
      },
    };

    fetch(API_URL + API_VERSION + `/brands/${brandId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(brandData),
    })
      .then((response) => response.json())
      .then(() => {
        navigation.navigate("BrandsList");
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL + API_VERSION + `/brands/${brandId}`, {})
      .then((response) => response.json())
      .then((payload) => {
        setName(payload.name);
        setYear(payload.year);
      })
      .finally(() => setIsLoading(false));
  }, [brandId]);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View style={{ padding: 16 }}>
      <Text>Brand name</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 16,
        }}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text>Brand year</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 16,
        }}
        value={year}
        onChangeText={(text) => setYear(text)}
      />

      <Button title="Submit" onPress={handleSubmit} />

      <Button
        title="Back to brand"
        onPress={() => navigation.navigate("BrandDetails", { brandId })}
        style={{ marginTop: 16 }}
      />
    </View>
  );
};

export default UpdateBrand;
