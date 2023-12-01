import React from "react";
import { AppRegistry } from "react-native";
import AppNavigator from "./AppNavigator";
import { expo } from "./app.json";

const App = () => <AppNavigator />;

AppRegistry.registerComponent(expo.name, () => App);

export default App;
