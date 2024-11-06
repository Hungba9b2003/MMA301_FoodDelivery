import React, { useLayoutEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import MenuImage from "../../components/MenuImage/MenuImage";
import Config from "@/config";

export default function CategoriesScreen(props) {
  const { navigation } = props;
  const [categories, setCategories] = useState([]); // State to store categories

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, [navigation]);

  // Fetch categories every time the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get(
            `${Config.API_BASE_URL}/api/recipes/category/oke`,
            { headers: { "Cache-Control": "no-cache" } }
          );
          setCategories(response.data);
        } catch (error) {
          console.error("Error fetching categories:", error.message);
        }
      };

      fetchCategories();
    }, []) // Empty array means this effect runs on focus
  );

  const onPressCategory = (item) => {
    const title = item.typeRecipe;
    const category = item;
    navigation.navigate("RecipesList", { category, title }); // Navigate to RecipesList
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressCategory(item)}
    >
      <View style={styles.categoriesItemContainer}>
        <Image
          style={styles.categoriesPhoto}
          source={{ uri: item.firstImage }}
        />
        <Text style={styles.categoriesName}>{item.typeRecipe}</Text>
        <Text style={styles.categoriesInfo}>{item.count} recipes</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.typeRecipe}
        numColumns={1} // Display one item per row
        contentContainerStyle={styles.listContainer} // Style for FlatList container
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  listContainer: {
    paddingVertical: 10,
  },
  categoriesItemContainer: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    alignItems: "center",
    padding: 15,
  },
  categoriesPhoto: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  categoriesName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  categoriesInfo: {
    fontSize: 14,
    color: "#888",
  },
});
