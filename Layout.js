import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons"; // Assuming you're using Expo for vector icons
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import useAuth from "./useAuth";

const Layout = ({ children }) => {
  const navigation = useNavigation();
  const { auth, saveToken } = useAuth();
  const [theme, setTheme] = useState("light-theme");

  const navigateTo = (path) => {
    navigation.navigate(path);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/users/sign_out`, {
        method: "DELETE",
        headers: {
          Authorization: auth.accessToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        saveToken({ jwt: null, expiration: null });
        navigateTo("CarsList");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "light-theme" ? "dark-theme" : "light-theme"
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Top navigation */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 16,
        }}
      >
        <TouchableOpacity onPress={() => navigateTo("Home")}>
          <Feather name="home" size={24} color="black" />
          <Text>Main page</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo("BrandsList")}>
          <Feather name="briefcase" size={24} color="black" />
          <Text>Brands list</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo("CarsList")}>
          <Feather name="shopping-cart" size={24} color="black" />
          <Text>Cars list</Text>
        </TouchableOpacity>
        {auth.accessToken ? (
          <TouchableOpacity onPress={handleLogout}>
            <Feather name="user" size={24} color="black" />
            <Text>Logout</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigateTo("Login")}>
            <Feather name="user" size={24} color="black" />
            <Text>Login</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Main content area */}
      <View style={{ flex: 1, padding: 16 }}>
        {/* Language Selector */}
        <LanguageSelector />

        {/* Render your specific route components here */}
        {children}
      </View>
    </View>
  );
};

export default Layout;
