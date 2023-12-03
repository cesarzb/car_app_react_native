import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { API_URL } from "./constants";
import { useNavigation } from "@react-navigation/native";
import useAuth from "./useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const { saveToken } = useAuth();

  const handleChange = (field, value) => {
    if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    const userData = { user: { email, password } };

    try {
      const response = await fetch(`${API_URL}/users/sign_in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() + 1);
        saveToken({
          jwt: response.headers.get("Authorization"),
          expiration: tomorrow,
        });
        navigation.navigate("BrandsList"); // Use the name of your Brands screen
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formField}>
        <Text style={styles.formLabel}>Email</Text>
        <TextInput
          style={styles.formInput}
          value={email}
          onChangeText={(value) => handleChange("email", value)}
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Password</Text>
        <TextInput
          style={styles.formInput}
          secureTextEntry
          value={password}
          onChangeText={(value) => handleChange("password", value)}
        />
      </View>

      <Button title="Login" onPress={handleSubmit} />

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerLink}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  formField: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  formInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
  registerLink: {
    marginTop: 10,
    color: "blue",
    textAlign: "center",
  },
});

export default Login;
