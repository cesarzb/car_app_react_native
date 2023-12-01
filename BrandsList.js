import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL, API_VERSION } from "./constants";

const BrandsList = () => {
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1);

  const navigation = useNavigation();

  const fetchBrands = (pageNumber) => {
    fetch(`${API_URL}${API_VERSION}/brands?page=${pageNumber}`)
      .then((response) => response.json())
      .then((payload) => setBrands(payload));
  };

  useEffect(() => {
    fetchBrands(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <View style={{ padding: 16 }}>
      <TouchableOpacity onPress={() => navigation.navigate("CreateBrand")}>
        <Text>Create a new brand</Text>
      </TouchableOpacity>

      {brands.length > 0 ? (
        <>
          {brands.map((brand) => (
            <View key={brand.id} style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {brand.name}
              </Text>
              <Text>{brand.year}</Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("BrandDetails", { brandId: brand.id })
                }
              >
                <Text style={{ color: "blue", fontSize: 16 }}>Show brand</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 16,
            }}
          >
            <Button
              title="Previous"
              onPress={() => handlePageChange(page - 1)}
              disabled={page === 1}
            />
            <Button title="Next" onPress={() => handlePageChange(page + 1)} />
          </View>
        </>
      ) : (
        <>
          <Text>No brands to show :(</Text>
          {page !== 1 && (
            <Button
              title="Previous"
              onPress={() => handlePageChange(page - 1)}
              disabled={page === 1}
            />
          )}
        </>
      )}
    </View>
  );
};

export default BrandsList;
