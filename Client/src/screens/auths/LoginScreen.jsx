import React, { useState, useContext } from "react";
import Config from "@/config";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  TouchableHighlight,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/AuthContext";
import axios from "axios";
function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputEmailStyle = isEmailActive ? styles.inputActive : styles.input;
  const inputPasswordStyle = isPasswordActive
    ? styles.inputActive
    : styles.input;

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${Config.API_BASE_URL}/api/auth/login`,
        { email, password }
      );
      login(response.data.user); // Update login status globally
      navigation.navigate("Home");
      Alert.alert("Login successful");
    } catch (error) {
      console.log("Login Error:", error);
      Alert.alert("Error", error.response?.data?.message || "Login failed");
    }
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/Profile.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome!</Text>
          <Text>Log in to your existing account.</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={inputEmailStyle}
            onChangeText={onChangeEmail}
            onFocus={() => setIsEmailActive(true)}
            onBlur={() => setIsEmailActive(false)}
            value={email}
            secureTextEntry={false}
            placeholder="Email"
          />

          <TextInput
            style={inputPasswordStyle}
            onChangeText={onChangePassword}
            onFocus={() => setIsPasswordActive(true)}
            onBlur={() => setIsPasswordActive(false)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
          />
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              underlayColor="white"
              style={styles.buttonHighlight}
              onPress={handleLogin}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>LOG IN</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Don’t have an account?{" "}
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
  },
  logo: {
    resizeMode: "contain",
    padding: 20,
    margin: 20,
    width: 180,
    height: 180,
    borderRadius: 50,
  },
  title: {
    fontSize: 30,
    color: "#EFC81A",
  },
  formContainer: {
    paddingBottom: 100,
  },
  input: {
    height: 50,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  inputActive: {
    height: 50,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#eee",
    borderColor: "#EFC81A",
    color: "black",
  },
  buttonContainer: {
    margin: 12,
  },
  buttonHighlight: {
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#EFC81A",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    padding: 12,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  signUpContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  signUpText: {
    textAlign: "center",
  },
  signUpLink: {
    color: "#EFC81A",
  },
});

export default LoginScreen;
