import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { API_URL, API_VERSION } from "./constants";
import { useNavigation } from "@react-navigation/native";
import useAuth from "./useAuth";
import { useTranslation } from "react-i18next";

const CreateBrand = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [yearTouched, setYearTouched] = useState(false);
  const [yearValid, setYearValid] = useState(false);
  const [brandValid, setBrandValid] = useState(false);
  const { auth } = useAuth();
  const navigation = useNavigation();

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
      fetch(API_URL + API_VERSION + `/brands`, {
        method: "POST",
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
            navigation.navigate("Brands", { replace: true });
          }
        })
        .then(() => {
          setNameValid(false);
        });
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 8 }}>{t("Brand name")}</Text>
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
          }}
          value={name}
          onChangeText={nameChange}
        />
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 8 }}>{t("Brand year")}</Text>
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
          }}
          value={year}
          onChangeText={yearChange}
        />
      </View>
      <Button title={t("Submit")} onPress={handleSubmit} />
    </View>
  );
};

export default CreateBrand;
