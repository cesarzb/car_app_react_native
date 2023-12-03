import React from "react";
import { AppRegistry } from "react-native";
import AppNavigator from "./AppNavigator";
import { expo } from "./app.json";
import { AuthProvider } from "./AuthProvider";

const App = () => (
  <AuthProvider>
    <AppNavigator />
  </AuthProvider>
);
AppRegistry.registerComponent(expo.name, () => App);

export default App;
