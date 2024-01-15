import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { API_URL, API_VERSION } from "./constants";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const BrandsList = () => {
  const { t } = useTranslation();
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1); // Initial page
  const navigation = useNavigation();

  const fetchBrands = (pageNumber) => {
    fetch(`${API_URL}${API_VERSION}/brands?page=${pageNumber}`)
      .then((response) => response.json())
      .then((payload) => setBrands(payload));
  };

  useEffect(() => {
    fetchBrands(page); // Initial fetch
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleBrandClick = (id) => {
    navigation.navigate("BrandDetails", { brandId: id });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity
        style={{ backgroundColor: "blue", padding: 10, marginBottom: 16 }}
        onPress={() => navigation.navigate("CreateBrand")}
      >
        <Text style={{ color: "white" }}>{t("Create a new brand")}</Text>
      </TouchableOpacity>
      {brands.length > 0 && (
        <FlatList
          data={brands}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: "lightgray",
                padding: 10,
                marginBottom: 8,
              }}
              onPress={() => handleBrandClick(item.id)}
            >
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text>{item.year}</Text>
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
          disabled={brands.length < 12}
        >
          <Text style={{ color: "white" }}>{t("Next")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BrandsList;
