import React, { useState, useEffect, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome"; // Đảm bảo đã import Icon
import Register from "../screens/auths/RegisterScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";
import DetailScreen from "../screens/Recipe/DetailScreen";
import RecipesListScreen from "../screens/RecipesList/RecipesListScreen";
import DrawerContainer from "../screens/DrawerContainer/DrawerContainer";
import IngredientScreen from "../screens/Ingredient/IngredientScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import IngredientsDetailsScreen from "../screens/IngredientsDetails/IngredientsDetailsScreen";
import AddRecipeScreen from "../screens/Recipe/AddRecipeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Ensure AsyncStorage is imported
import { useFocusEffect } from "@react-navigation/native";
import UserRecipesScreen from "../screens/RecipesList/UserRecipesScreen";
import UpdateRecipeScreen from "../screens/Recipe/UpdateRecipeScreen";
import FavoritesScreen from "../screens/RecipesList/FavouritesScreen";
// import ChatScreen from "../screens/Chat/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/auths/LoginScreen";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import { AuthContext } from "@/AuthContext";
function TabNavigator() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      {isLoggedIn && (
        <>
          <Tab.Screen
            name="AddRecipe"
            component={AddRecipeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="plus-square" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="heart" size={size} color={color} />
              ),
            }}
          />
        </>
      )}
      <Tab.Screen
        name="Category"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={isLoggedIn ? "Profile" : "Login"}
        component={isLoggedIn ? ProfileScreen : LoginScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={isLoggedIn ? "user" : "sign-in"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UserRecipes"
        component={UserRecipesScreen}
        options={{ tabBarButton: () => null }} // Ẩn nút tab
      />
      <Tab.Screen
        name="UpdateRecipe"
        component={UpdateRecipeScreen}
        options={{ tabBarButton: () => null }} // Ẩn nút tab
      />
      <Tab.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{ tabBarButton: () => null }} // Ẩn nút tab
      />
      <Tab.Screen
        name="RecipesList"
        component={RecipesListScreen}
        options={{ tabBarButton: () => null }} // Ẩn nút tab
      />
    </Tab.Navigator>
  );
}

function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="RecipesList" component={RecipesListScreen} />
      <Stack.Screen name="Ingredient" component={IngredientScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="IngredientsDetails"
        component={IngredientsDetailsScreen}
      />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      initialRouteName="Main"
      drawerStyle={{
        width: 250,
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <DrawerContainer navigation={navigation} />
      )}
    >
      <Drawer.Screen name="Main" component={MainNavigator} />
    </Drawer.Navigator>
  );
}

export default function AppContainer() {
  return (
    <NavigationContainer independent={true}>
      <DrawerStack />
    </NavigationContainer>
  );
}

console.disableYellowBox = true;
