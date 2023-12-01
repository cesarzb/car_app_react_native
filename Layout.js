import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Layout = ({ children }) => {
  const navigation = useNavigation();

  const navigateTo = (path) => {
    navigation.navigate(path);
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
      </View>
      <View style={{ flex: 1, padding: 16 }}>{children}</View>
    </View>
  );
};

export default Layout;
