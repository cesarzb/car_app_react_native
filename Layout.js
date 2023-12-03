import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "./useAuth";
import { API_URL } from "./constants";

const Layout = ({ children }) => {
  const navigation = useNavigation();
  const { auth, saveToken } = useAuth();

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

      saveToken({ jwt: null, expiration: null });
      navigateTo("Layout");
    } catch (error) {
      // console.error("An error occurred:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 16,
        }}
      >
        <TouchableOpacity onPress={() => navigateTo("Home")}>
          <Text>Main page</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo("BrandsList")}>
          <Text>Brands list</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo("CarsList")}>
          <Text>Cars list</Text>
        </TouchableOpacity>
        {auth.accessToken ? (
          <TouchableOpacity onPress={handleLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigateTo("Login")}>
            <Text>Login</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flex: 1, padding: 16 }}>{children}</View>
    </View>
  );
};

export default Layout;
