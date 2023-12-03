import React, { useEffect } from "react";
import { View, Text } from "react-native";
import useAuth from "./useAuth";
import { useNavigation } from "@react-navigation/native";

const RequireAuth = ({ children }) => {
  const { auth } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    // Check if the user is authenticated and the token is not expired
    const now = new Date();
    if (!auth.accessToken || auth.expiration <= now) {
      // Redirect to the login screen or handle authentication as needed
      navigation.replace("Login");
    }
  }, [auth.accessToken, auth.expiration, navigation]);

  return (
    <View>
      {/* Render the children components if the user is authenticated */}
      {auth.accessToken && auth.expiration > new Date() ? (
        children
      ) : (
        <Text>You need to log in to access this page</Text>
      )}
    </View>
  );
};

export default RequireAuth;
