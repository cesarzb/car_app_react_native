import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    accessToken: "",
    expiration: null,
  });

  useEffect(() => {
    // Load token from AsyncStorage on component mount
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("jwtToken");
      const storedExpiration = await AsyncStorage.getItem("jwtTokenExpiration");

      if (storedToken && storedExpiration) {
        setAuth({ accessToken: storedToken, expiration: storedExpiration });
      }
    };

    loadToken();
  }, []);

  const saveToken = (token) => {
    AsyncStorage.setItem("jwtToken", token.jwt);
    AsyncStorage.setItem("jwtTokenExpiration", token.expiration);

    setAuth({ accessToken: token.jwt, expiration: token.expiration });
  };

  return (
    <AuthContext.Provider value={{ auth, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
