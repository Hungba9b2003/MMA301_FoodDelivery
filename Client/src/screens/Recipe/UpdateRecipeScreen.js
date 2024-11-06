import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Config from "@/config";
import { AuthContext } from "@/AuthContext";

const UpdateRecipeScreen = ({ navigation, route }) => {
  const { recipe } = route.params;
  const { getUserId } = useContext(AuthContext);

  const [name, setName] = useState(recipe.name);
  const [imageUrl, setImageUrl] = useState(recipe.imageUrl[0]);
  const [description, setDescription] = useState(recipe.description);
  const [totalTime, setTotalTime] = useState(recipe.totalTime);
  const [typeRecipe, setTypeRecipe] = useState(recipe.typeRecipe);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [steps, setSteps] = useState(recipe.steps);

  useEffect(() => {
    setName(recipe.name);
    setImageUrl(recipe.imageUrl[0]);
    setDescription(recipe.description);
    setTotalTime(recipe.totalTime);
    setTypeRecipe(recipe.typeRecipe);
    setIngredients(recipe.ingredients);
    setSteps(recipe.steps);
  }, [recipe]);

  const updateRecipe = async () => {
    if (!name || !description || !totalTime || !typeRecipe) {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return;
    }

    const recipeData = {
      name,
      imageUrl, // Gửi trực tiếp, không cần mảng
      description,
      totalTime,
      typeRecipe,
      ingredients,
      steps,
      updateAt: new Date(),
    };

    try {
      await axios.put(
        `${Config.API_BASE_URL}/api/recipes/user/update/${recipe._id}`,
        recipeData
      );
      Alert.alert("Success", "Recipe updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating recipe:", error);
      Alert.alert("Error", "Failed to update recipe. Please try again.");
    }
  };

  const handleAddIngredient = () => {
    const newIngredient = { name: "", measurement: "", imageUrl: "" };
    setIngredients([...ingredients, newIngredient]);
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleAddStep = () => {
    const newStep = { stepName: "", description: "", imageUrl: "", time: 0 };
    setSteps([...steps, newStep]);
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  };

  const handleRemoveStep = (index) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagePreview}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.previewImage} />
        ) : null}
      </View>
      <Text style={styles.title}>Update Recipe</Text>

      <Text style={styles.label}>Recipe Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Recipe Name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Image URL</Text>
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Total Time (minutes)</Text>
      <TextInput
        style={styles.input}
        placeholder="Total Time"
        value={String(totalTime)}
        onChangeText={(text) => setTotalTime(Number(text))}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Type Recipe</Text>
      <TextInput
        style={styles.input}
        placeholder="Type Recipe"
        value={typeRecipe}
        onChangeText={setTypeRecipe}
      />

      <Text style={styles.sectionTitle}>Ingredients</Text>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientContainer}>
          <Text style={styles.label}>Ingredient Name</Text>
          <TextInput
            style={styles.input}
            value={ingredient.name}
            onChangeText={(text) => handleIngredientChange(index, "name", text)}
          />
          <Text style={styles.label}>Measurement</Text>
          <TextInput
            style={styles.input}
            value={ingredient.measurement}
            onChangeText={(text) =>
              handleIngredientChange(index, "measurement", text)
            }
          />
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={ingredient.imageUrl}
            onChangeText={(text) =>
              handleIngredientChange(index, "imageUrl", text)
            }
          />
          <TouchableOpacity
            onPress={() => handleRemoveIngredient(index)}
            style={styles.removeButton}
          >
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
        <Text style={styles.addButtonText}>Add Ingredient</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Steps</Text>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <Text style={styles.label}>Step Name</Text>
          <TextInput
            style={styles.input}
            value={step.stepName}
            onChangeText={(text) => handleStepChange(index, "stepName", text)}
          />
          <Text style={styles.label}>Step Description</Text>
          <TextInput
            style={styles.input}
            value={step.description}
            onChangeText={(text) =>
              handleStepChange(index, "description", text)
            }
            multiline
            numberOfLines={4}
          />
          <Text style={styles.label}>Step Image URL</Text>
          <TextInput
            style={styles.input}
            value={step.imageUrl}
            onChangeText={(text) => handleStepChange(index, "imageUrl", text)}
          />
          <Text style={styles.label}>Time (seconds)</Text>
          <TextInput
            style={styles.input}
            value={String(step.time)}
            onChangeText={(text) =>
              handleStepChange(index, "time", Number(text))
            }
            keyboardType="numeric"
          />
          <TouchableOpacity
            onPress={() => handleRemoveStep(index)}
            style={styles.removeButton}
          >
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddStep}>
        <Text style={styles.addButtonText}>Add Step</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.updateButton} onPress={updateRecipe}>
        <Text style={styles.buttonText}>Update Recipe</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate("UserRecipes")}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  ingredientContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  stepContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  updateButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 60,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: "#f44336",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default UpdateRecipeScreen;
