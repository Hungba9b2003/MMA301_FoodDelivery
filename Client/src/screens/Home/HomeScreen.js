import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import axios from "axios";
import MenuImage from "../../components/MenuImage/MenuImage";
import Config from "@/config";
import { getCategoryName } from "../../data/MockDataAPI";
import { useIsFocused } from "@react-navigation/native";
export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <MenuImage onPress={() => navigation.openDrawer()} />,
      headerRight: () => (
        <Button
          title="Add Recipe"
          onPress={() => navigation.navigate("AddRecipe")}
        />
      ),
    });
  }, [navigation]);

  // Fetch recipes whenever the screen is focused
  useEffect(() => {
    if (isFocused) {
      fetchRecipes();
    }
  }, [isFocused]); // Dependency on isFocused ensures the effect runs when screen is focused

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${Config.API_BASE_URL}/api/recipes`);
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
    }
  };

  const onPressRecipe = (recipe) => {
    // console.log(recipe);
    navigation.navigate("DetailScreen", { recipe });
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderRecipes = ({ item: recipe }) => (
    <TouchableHighlight
      style={styles.recipeContainer}
      onPress={() => onPressRecipe(recipe)}
      underlayColor="#e0e0e0"
    >
      <View style={styles.recipeContent}>
        <Image
          style={styles.photo}
          source={{
            uri: recipe.imageUrl[0] || "https://example.com/default-image.jpg",
          }}
          resizeMode="cover"
        />
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.category}>
          {getCategoryName(recipe.typeRecipe)}
        </Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search recipes..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={filteredRecipes}
        renderItem={renderRecipes}
        keyExtractor={(recipe) => recipe._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginTop: 20,
    backgroundColor: "#f9f9f9",
    marginHorizontal: 10,
  },
  recipeContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recipeContent: {
    alignItems: "center",
    padding: 10,
  },
  photo: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  category: {
    fontSize: 14,
    color: "#666",
  },
});
