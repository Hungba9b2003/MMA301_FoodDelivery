import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import Config from "@/config";
import { AuthContext } from "@/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

const UserRecipesScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const { getUserId } = useContext(AuthContext); // Assuming you have a function to get the user ID

  // Function to fetch user recipes
  const fetchUserRecipes = async () => {
    const userId = await getUserId(); // Fetch the user ID
    try {
      const response = await axios.get(
        `${Config.API_BASE_URL}/api/recipes/user/${userId}`
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching user recipes:", error);
    }
  };

  // Use this to reload data when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUserRecipes(); // Call the fetch function when screen is focused
    }, [])
  );

  const deleteRecipe = (recipeId) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa công thức này không?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Hủy xóa"),
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: async () => {
            try {
              await axios.delete(
                `${Config.API_BASE_URL}/api/recipes/user/delete/${recipeId}`
              );
              setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
              Alert.alert("Thành công", "Công thức đã được xóa thành công.");
            } catch (error) {
              console.error("Lỗi khi xóa công thức:", error);
              Alert.alert("Lỗi", "Không thể xóa công thức. Vui lòng thử lại.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderRecipe = ({ item }) => (
    <View style={styles.recipeItem}>
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailScreen", { recipe: item })}
      >
        <Image source={{ uri: item.imageUrl[0] }} style={styles.recipeImage} />
        <Text style={styles.recipeName}>{item.name}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UpdateRecipe", { recipe: item })}
          style={styles.updateButton}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteRecipe(item._id)}
          style={styles.deleteButton}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item._id} // Assuming each recipe has a unique ID
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  recipeItem: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  recipeImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: "#4CAF50", // Màu xanh lá cây
    paddingVertical: 10, // Thêm khoảng cách dọc
    paddingHorizontal: 15, // Thêm khoảng cách ngang
    borderRadius: 5,
    borderWidth: 1, // Đường viền
    borderColor: "#388E3C", // Màu đường viền
    shadowColor: "#000", // Đổ bóng
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Đổ bóng cho Android
  },
  deleteButton: {
    backgroundColor: "#F44336", // Màu đỏ
    paddingVertical: 10, // Thêm khoảng cách dọc
    paddingHorizontal: 15, // Thêm khoảng cách ngang
    borderRadius: 5,
    borderWidth: 1, // Đường viền
    borderColor: "#C62828", // Màu đường viền
    shadowColor: "#000", // Đổ bóng
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Đổ bóng cho Android
  },
  buttonText: {
    color: "#fff", // Màu chữ trắng
    fontWeight: "bold",
    textAlign: "center",
  },
  recipeName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserRecipesScreen;
