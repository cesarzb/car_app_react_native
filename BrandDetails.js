import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { API_URL, API_VERSION } from "./constants";
import DeleteBrand from "./DeleteBrand";
import useAuth from "./useAuth";
import { useTranslation } from "react-i18next";

const BrandDetails = ({ route, navigation }) => {
  const { auth } = useAuth();
  const [brand, setBrand] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { brandId } = route.params;
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}${API_VERSION}/brands/${brandId}`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setBrand(payload);
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{brand.name}</Text>
          <Text>{brand.year}</Text>
        </View>
      </View>
      <View style={{ marginTop: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}
            onPress={() => navigation.navigate("BrandsList")}
          >
            <Text style={{ color: "white" }}>{t("Back to brands list")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}
            onPress={() =>
              navigation.navigate("UpdateBrand", { brandId: brand.id })
            }
          >
            <Text style={{ color: "white" }}>{t("Edit brand")}</Text>
          </TouchableOpacity>
          <DeleteBrand brandId={brandId} />
        </View>
      </View>
    </View>
  );
};

export default BrandDetails;
