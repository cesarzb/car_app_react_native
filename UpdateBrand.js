import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import useAuth from "./useAuth";
import { API_URL, API_VERSION } from "./constants";
import { useTranslation } from "react-i18next";

const UpdateBrand = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { brandId } = route.params;
  const { auth } = useAuth();

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [yearTouched, setYearTouched] = useState(false);
  const [yearValid, setYearValid] = useState(false);
  const [brandValid, setBrandValid] = useState(false);

  useEffect(() => setNameValid(name.length > 0), [name]);
  useEffect(() => setYearValid(Number(year) > 0), [year]);
  useEffect(() => setBrandValid(nameValid && yearValid), [name, year]);

  const nameChange = (text) => {
    setName(text);
    setNameTouched(true);
  };

  const yearChange = (text) => {
    setYear(text);
    setYearTouched(true);
  };

  const handleSubmit = () => {
    if (brandValid) {
      const brandData = {
        brand: {
          name,
          year,
        },
      };

      fetch(`${API_URL}${API_VERSION}/brands/${brandId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.accessToken,
        },
        body: JSON.stringify(brandData),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json();
          } else {
            navigation.replace("Brands"); // Assuming 'Brands' is the name of the screen in your navigation stack
          }
        })
        .then(() => {
          setNameValid(false);
        });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}${API_VERSION}/brands/${brandId}`, {
      headers: {
        Authorization: auth.accessToken,
      },
    })
      .then((response) => response.json())
      .then((payload) => {
        setName(payload.name);
        setYear(payload.year);
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
        <Text>{t("Brand name")}</Text>
        {nameTouched && !nameValid && (
          <Text style={{ color: "red" }}>
            {t("This brand name is invalid")}
          </Text>
        )}
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 16,
          }}
          value={name}
          onChangeText={nameChange}
        />
      </View>
      <View>
        <Text>{t("Brand year")}</Text>
        {yearTouched && !yearValid && (
          <Text style={{ color: "red" }}>
            {t("Brand year must be greater than 0")}
          </Text>
        )}
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 16,
          }}
          value={year}
          onChangeText={yearChange}
        />
      </View>
      <View style={{ marginTop: 16 }}>
        <Button title={t("Submit")} onPress={handleSubmit} />
        <Link to={`/brands/${brandId}`} style={{ marginTop: 16 }}>
          <Text>{t("Back to brand")}</Text>
        </Link>
      </View>
    </View>
  );
};

export default UpdateBrand;
