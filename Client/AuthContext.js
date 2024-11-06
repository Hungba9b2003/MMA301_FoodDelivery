import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status on app start
    const loadLoginStatus = async () => {
      const user = await AsyncStorage.getItem("user");
      console.log(user);
      setIsLoggedIn(!!user);
    };
    loadLoginStatus();
  }, []);

  const login = async (userData) => {
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setIsLoggedIn(false);
  };
  const getUserId = async () => {
    const userData = await AsyncStorage.getItem("user");
    const user = JSON.parse(userData);
    console.log(user._id);
    return user ? user._id : null;
  };
  const getFavoriteIds = async () => {
    const userData = await AsyncStorage.getItem("user");
    const user = JSON.parse(userData);
    return user ? user.favorite : [];
  };
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, getUserId, getFavoriteIds }}
    >
      {children}
    </AuthContext.Provider>
  );
};
