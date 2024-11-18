import React, { useLayoutEffect, useEffect, useState, useContext } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import axios from "axios";
import Config from "@/config";
import MenuImage from "../../components/MenuImage/MenuImage";
import { AuthContext } from "@/AuthContext";
import { useIsFocused } from "@react-navigation/native";

export default function FavoritesScreen({ navigation }) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { getUserId } = useContext(AuthContext);
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <MenuImage onPress={() => navigation.openDrawer()} />,
    });
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      fetchFavoriteRecipes();
    }
  }, [isFocused]);

  const fetchFavoriteRecipes = async () => {
    try {
      const userId = await getUserId();
      if (!userId) return;

      const response = await axios.get(
        `${Config.API_BASE_URL}/api/recipes/${userId}/favorites`
      );
      const favoriteIds = response.data.favoriteIds;
      // console.log(favoriteIds);
      const recipesResponse = await axios.post(
        `${Config.API_BASE_URL}/api/recipes/user/list/favourites`,
        { ids: favoriteIds }
      );
      // console.log(recipesResponse.data);
      setFavoriteRecipes(recipesResponse.data);
    } catch (error) {
      console.error("Error fetching favorite recipes:", error.message);
    }
  };

  const onPressRecipe = (recipe) => {
    navigation.navigate("DetailScreen", { recipe });
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredRecipes = favoriteRecipes.filter((recipe) =>
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
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search favorite recipes..."
        value={searchText}
        onChangeText={handleSearch}
      />
      {favoriteRecipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite recipes found</Text>
        </View>
      ) : (
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={favoriteRecipes}
          renderItem={renderRecipes}
          keyExtractor={(recipe) => recipe._id}
        />
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
});
