import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status on app start
    const loadLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        console.log(user);
        setIsLoggedIn(!!user);
      } catch (error) {
        console.error("Error loading login status:", error);
      }
    };
    loadLoginStatus();
  }, []);

  const login = async (userData) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const user = JSON.parse(userData);
      console.log(user?._id);
      return user ? user._id : null;
    } catch (error) {
      console.error("Error getting user ID:", error);
      return null;
    }
  };

  const getFavoriteIds = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      const user = JSON.parse(userData);
      return user ? user.favorite : [];
    } catch (error) {
      console.error("Error getting favorite IDs:", error);
      return [];
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, getUserId, getFavoriteIds }}
    >
      {children}
    </AuthContext.Provider>
  );
};
