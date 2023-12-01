import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { API_URL, API_VERSION } from "./constants";
import DeleteBrand from "./DeleteBrand";

const BrandDetails = () => {
  const [brand, setBrand] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();
  const { brandId } = route.params;

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL + API_VERSION + `/brands/${brandId}`, {})
      .then((response) => response.json())
      .then((payload) => {
        setBrand(payload);
        setIsLoading(false);
      });
  }, [brandId]);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Name: {brand.name}
        </Text>
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text>Year: {brand.year}</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("UpdateBrand", { brandId })}
        style={{ marginBottom: 16 }}
      >
        <Text style={{ color: "blue", fontSize: 16 }}>Edit brand</Text>
      </TouchableOpacity>

      <DeleteBrand brandId={brandId} />

      <TouchableOpacity
        onPress={() => navigation.navigate("BrandsList")}
        style={{ marginTop: 16 }}
      >
        <Text style={{ color: "blue", fontSize: 16 }}>Back to brands list</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BrandDetails;
