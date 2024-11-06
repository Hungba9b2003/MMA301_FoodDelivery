import React, { useState, useContext, useEffect } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { AuthContext } from "@/AuthContext";
import Icon from "react-native-vector-icons/AntDesign";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import Config from "@/config";
function DetailScreen({ navigation, route }) {
  const { recipe } = route.params || {};
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showIngredients, setShowIngredients] = useState(true); // Toggle between ingredients and steps

  const { isLoggedIn, getUserId, getFavoriteIds } = useContext(AuthContext);

  useEffect(() => {
    const checkIfLiked = async () => {
      const userId = await getUserId();
      if (userId) {
        try {
          // Gửi request API để lấy danh sách yêu thích của người dùng
          const response = await axios.get(
            `${Config.API_BASE_URL}/api/recipes/${userId}/favorites`
          );
          const favoriteIds = response.data.favoriteIds;

          // Kiểm tra xem recipe._id có trong danh sách yêu thích hay không
          setLiked(favoriteIds.includes(recipe._id));
        } catch (error) {
          console.error("Error fetching favorite list:", error);
          Alert.alert("Error", "Unable to load favorite list.");
        }
      }
    };

    checkIfLiked();
  }, [recipe._id, getUserId]);

  const handleLikeButton = async () => {
    const userId = await getUserId();
    if (!userId) {
      Alert.alert("Please log in to like recipes.");
      return;
    }

    try {
      const action = liked ? "unlike" : "like";
      const response = await axios({
        method: action === "like" ? "post" : "delete",
        url: `${Config.API_BASE_URL}/api/recipes/user/${action}/${recipe._id}`,
        data: { userId },
      });

      setLiked(!liked);
      Alert.alert("Success", response.data.message);
    } catch (error) {
      console.error("Error handling like/unlike:", error);
      Alert.alert("Error", "Unable to update like status. Please try again.");
    }
  };

  const handleSaveButton = () => {
    if (!isLoggedIn) {
      Alert.alert("Please log in to save recipes.");
      return;
    }
    setSaved(!saved);
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: recipe.imageUrl[0] }}
        style={styles.headerBackground}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.recipeTitle}>{recipe.name}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={handleSaveButton}>
              <Icon name="save" size={20} color={saved ? "gold" : "#fff"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLikeButton}>
              <Icon name="hearto" size={20} color={liked ? "gold" : "#fff"} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.contentContainer}>
        <View style={styles.iconRow}>
          <View style={styles.iconContainer}>
            <IconMaterial name="clock" size={40} color="#000" />
            <Text style={styles.iconText}>{recipe.totalTime} min</Text>
          </View>
          <View style={styles.iconContainer}>
            <IconMaterial name="food" size={40} color="#000" />
            <Text style={styles.iconText}>{recipe.typeRecipe}</Text>
          </View>
        </View>
        <Text style={styles.description}>
          Description: {recipe.description}
        </Text>

        {/* Toggle Buttons for Ingredients and Steps */}
        <View style={styles.buttonSwitch}>
          <Button
            title="Ingredients"
            onPress={() => setShowIngredients(true)}
          />
          <Button title="Steps" onPress={() => setShowIngredients(false)} />
        </View>

        <ScrollView>
          {/* Conditionally render Ingredients or Steps based on showIngredients state */}
          {showIngredients ? (
            <View style={styles.ingredientsView}>
              {recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  {ingredient.imageUrl && (
                    <Image
                      source={{ uri: ingredient.imageUrl }}
                      style={styles.ingredientImage}
                    />
                  )}
                  <Text style={styles.ingredientName}>{ingredient.name}</Text>
                  <Text style={styles.ingredientMeasurement}>
                    {ingredient.measurement}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.stepsView}>
              {recipe.steps.map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <Text style={styles.stepTitle}>
                    Step {index + 1}: {step.stepName}
                  </Text>
                  <Text>{step.description}</Text>
                  {step.imageUrl && (
                    <Image
                      source={{ uri: step.imageUrl }}
                      style={styles.stepImage}
                    />
                  )}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBackground: {
    height: 250,
    justifyContent: "flex-end",
    width: "100%",
  },
  headerContent: {
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  recipeTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 25,
    padding: 10,
  },
  iconText: {
    marginTop: 5,
    fontSize: 18,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  buttonSwitch: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  ingredientsView: {
    backgroundColor: "#FAF7ED",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ingredientImage: {
    width: 90,
    height: 90,
    borderRadius: 5,
    marginRight: 10,
  },
  ingredientName: {
    fontSize: 16,
    flex: 1,
  },
  ingredientMeasurement: {
    fontSize: 16,
    color: "#666",
  },
  stepsView: {
    backgroundColor: "#FAF7ED",
    borderRadius: 10,
    padding: 20,
  },
  stepItem: {
    marginBottom: 15,
  },
  stepImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginBottom: 5,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailScreen;
