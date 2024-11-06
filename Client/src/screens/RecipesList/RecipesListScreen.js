import React, { useLayoutEffect, useEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import axios from "axios";
import styles from "./styles";
import Config from "@/config";

export default function RecipesListScreen(props) {
  const { navigation, route } = props;
  const [recipesArray, setRecipesArray] = useState([]);
  const typeRecipe = route?.params?.title;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []);

  useEffect(() => {
    // Fetch recipes based on selected typeRecipe
    const fetchRecipes = async () => {
      try {
        console.log(typeRecipe);
        const response = await axios.get(
          `${Config.API_BASE_URL}/api/recipes/list/byTypeRecipe?typeRecipe=${typeRecipe}`
        );
        setRecipesArray(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    };

    if (typeRecipe) {
      fetchRecipes();
    }
  }, [typeRecipe]);

  const onPressRecipe = (item) => {
    let recipe = item;
    navigation.navigate("DetailScreen", { recipe });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      style={styles.recipeContainer}
      underlayColor="#e0e0e0"
      onPress={() => onPressRecipe(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.imageUrl[0] }} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.category}>{typeRecipe}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipesArray}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item._id}`}
      />
    </View>
  );
}
