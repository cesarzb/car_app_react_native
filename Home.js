import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Home = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Hello there!</Text>
      </View>
    </View>
  );
};

export default Home;
