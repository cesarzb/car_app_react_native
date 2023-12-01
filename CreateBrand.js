import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL, API_VERSION } from "./constants";

const CreateBrand = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("1234");

  const navigation = useNavigation();

  const handleSubmit = () => {
    const brandData = {
      brand: {
        name,
        year,
      },
    };

    fetch(API_URL + API_VERSION + "/brands", {
      method: "POST",
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

  return (
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
    </View>
  );
};

export default CreateBrand;
