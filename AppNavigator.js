// AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Home";
import Layout from "./Layout";
import CarsList from "./CarsList";
import CarDetails from "./CarDetails";
import CreateCar from "./CreateCar";
import UpdateCar from "./UpdateCar";
import BrandDetails from "./BrandDetails";
import BrandsList from "./BrandsList";
import CreateBrand from "./CreateBrand";
import UpdateBrand from "./UpdateBrand";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Layout">
        <Stack.Screen name="Layout" component={Layout} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CarsList" component={CarsList} />
        <Stack.Screen name="CarDetails" component={CarDetails} />
        <Stack.Screen name="CreateCar" component={CreateCar} />
        <Stack.Screen name="UpdateCar" component={UpdateCar} />
        <Stack.Screen name="BrandsList" component={BrandsList} />
        <Stack.Screen name="BrandDetails" component={BrandDetails} />
        <Stack.Screen name="CreateBrand" component={CreateBrand} />
        <Stack.Screen name="UpdateBrand" component={UpdateBrand} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
