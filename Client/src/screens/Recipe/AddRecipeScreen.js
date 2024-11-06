import React, { useState, useContext } from "react";
import Toast from "react-native-toast-message";
import axios from "axios";
import Config from "@/config";
import { AuthContext } from "@/AuthContext";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./styleAdd";

export default function AddRecipeScreen({ navigation }) {
  const { getUserId } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([
    { imageUrl: "", name: "", measurement: "" },
  ]);
  const [steps, setSteps] = useState([
    { stepName: "", description: "", imageUrl: "", time: 0 },
  ]);
  const [totalTime, setTotalTime] = useState(0);
  const [typeRecipe, setTypeRecipe] = useState("");

  // Validate inputs
  const validateInputs = () => {
    // Check if essential fields are filled
    if (!name || !description || !totalTime || !typeRecipe) {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return false;
    }

    // Check if ingredients and steps are filled properly
    for (let ingredient of ingredients) {
      if (!ingredient.name || !ingredient.measurement) {
        Alert.alert(
          "Validation Error",
          "Please fill in all ingredient details."
        );
        return false;
      }
    }

    for (let step of steps) {
      if (!step.stepName || !step.description || step.time <= 0) {
        Alert.alert("Validation Error", "Please fill in all step details.");
        return false;
      }
    }

    return true;
  };

  const addRecipe = async () => {
    const userId = await getUserId(); // Lấy userId

    if (!validateInputs()) {
      return; // Exit if validation fails
    }

    const recipeData = {
      name,
      imageUrl: [imageUrl], // Ensure imageUrl is an array as per schema
      description,
      ingredients,
      steps,
      totalTime,
      typeRecipe,
      userId, // Thêm userId vào dữ liệu công thức
      createAt: new Date(),
      updateAt: new Date(),
    };

    try {
      const response = await axios.post(
        `${Config.API_BASE_URL}/api/recipes/user/add`,
        recipeData
      );
      // console.log("Recipe added:", response.data);
      Alert.alert("Success", "Recipe added successfully!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error("Error adding recipe:", error);
      Alert.alert("Error", "Failed to add recipe. Please try again.");
    }
  };

  const addIngredient = () =>
    setIngredients([
      ...ingredients,
      { imageUrl: "", name: "", measurement: "" },
    ]);

  const addStep = () =>
    setSteps([
      ...steps,
      { stepName: "", description: "", imageUrl: "", time: 0 },
    ]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Recipe Name"
      />

      <Text style={styles.label}>Image URL:</Text>
      <TextInput
        style={styles.input}
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="Image URL"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />

      <Text style={styles.label}>Total Time (minutes):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(totalTime)}
        onChangeText={(text) => setTotalTime(Number(text))}
        placeholder="Total Time"
      />

      <Text style={styles.label}>Type of Recipe:</Text>
      <TextInput
        style={styles.input}
        value={typeRecipe}
        onChangeText={setTypeRecipe}
        placeholder="Type Recipe"
      />

      <Text style={styles.sectionHeader}>Ingredients:</Text>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientContainer}>
          <TextInput
            style={styles.input}
            value={ingredient.name}
            onChangeText={(text) => {
              const newIngredients = [...ingredients];
              newIngredients[index].name = text;
              setIngredients(newIngredients);
            }}
            placeholder="Ingredient Name"
          />
          <TextInput
            style={styles.input}
            value={ingredient.measurement}
            onChangeText={(text) => {
              const newIngredients = [...ingredients];
              newIngredients[index].measurement = text;
              setIngredients(newIngredients);
            }}
            placeholder="Measurement (e.g., 1 cup)"
          />
          <TextInput
            style={styles.input}
            value={ingredient.imageUrl}
            onChangeText={(text) => {
              const newIngredients = [...ingredients];
              newIngredients[index].imageUrl = text;
              setIngredients(newIngredients);
            }}
            placeholder="Image URL (Optional)"
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
        <Text style={styles.addButtonText}>Add Ingredient</Text>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>Steps:</Text>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <TextInput
            style={styles.input}
            value={step.stepName}
            onChangeText={(text) => {
              const newSteps = [...steps];
              newSteps[index].stepName = text;
              setSteps(newSteps);
            }}
            placeholder="Step Name"
          />
          <TextInput
            style={styles.input}
            value={step.description}
            onChangeText={(text) => {
              const newSteps = [...steps];
              newSteps[index].description = text;
              setSteps(newSteps);
            }}
            placeholder="Description"
          />
          <Text style={styles.label}>Step Time (minutes):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(step.time)}
            onChangeText={(text) => {
              const newSteps = [...steps];
              newSteps[index].time = Number(text);
              setSteps(newSteps);
            }}
            placeholder="Time (minutes)"
          />
          <TextInput
            style={styles.input}
            value={step.imageUrl}
            onChangeText={(text) => {
              const newSteps = [...steps];
              newSteps[index].imageUrl = text;
              setSteps(newSteps);
            }}
            placeholder="Image URL (Optional)"
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addStep}>
        <Text style={styles.addButtonText}>Add Step</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={addRecipe}>
        <Text style={styles.buttonText}>Save Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
