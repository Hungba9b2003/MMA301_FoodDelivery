import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "@/AuthContext";
function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const { logout } = useContext(AuthContext);
  // Function to load user data from AsyncStorage
  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  };

  useEffect(() => {
    loadUserData(); // Initial load when component mounts
  }, []);

  // Use this to reload data when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadUserData();
    }, [])
  );

  const handleLogout = () => {
    logout();
    navigation.navigate("Home");
  };
  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        {user ? (
          <>
            <Image
              source={{ uri: user.avatarUrl }}
              style={styles.profileIcon}
            />
            <Text style={styles.profileName}>{user.username}</Text>
          </>
        ) : (
          <Text style={styles.profileName}>Loading...</Text> // Show loading state
        )}
      </View>
      <View style={styles.profileCard}>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Icon name="user" size={24} color="#EEC242" />
              <Text style={styles.listItemText}>Edit Profile</Text>
            </View>
            <Icon name="angle-right" size={24} color="#8C8C8C" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("UserRecipes")}>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Icon name="award" size={25} color="#EEC242" />
              <Text style={styles.listItemText}>My Recipe</Text>
            </View>
            <Icon name="angle-right" size={24} color="#8C8C8C" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Icon2 name="sign-out" size={24} color="#EEC242" />
              <Text style={styles.listItemText}>Log Out</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70,
    paddingBottom: 40,
    backgroundColor: "#EEC242",
  },
  profileIcon: {
    padding: 20,
    width: 124,
    height: 124,
    borderRadius: 100,
  },
  profileName: {
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  profileCard: {
    marginTop: -24,
    marginHorizontal: 10,
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  list: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItemText: {
    fontSize: 16,
    color: "black",
    marginLeft: 10,
  },
});

export default ProfileScreen;
