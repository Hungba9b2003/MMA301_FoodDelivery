const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");
const User = require("../models/User");
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/user/add", async (req, res) => {
  const {
    userId,
    name,
    imageUrl,
    description,
    ingredients,
    steps,
    totalTime,
    typeRecipe,
  } = req.body;

  const newRecipe = new Recipe({
    userId,
    name,
    imageUrl,
    description,
    ingredients,
    steps,
    totalTime,
    typeRecipe,
    createAt: new Date(),
    updateAt: new Date(),
  });

  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/user/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    imageUrl,
    description,
    ingredients,
    steps,
    totalTime,
    typeRecipe,
  } = req.body;

  if (!name || !description || !totalTime || !typeRecipe) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    recipe.name = name;
    recipe.imageUrl = imageUrl;
    recipe.description = description;
    recipe.ingredients = ingredients;
    recipe.steps = steps;
    recipe.totalTime = totalTime;
    recipe.typeRecipe = typeRecipe;
    recipe.updateAt = new Date();

    const updatedRecipe = await recipe.save();

    res.status(200).json({
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({
      message: "Error updating recipe",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const {
    name,
    imageUrl,
    description,
    ingredients,
    steps,
    typeRecipe,
    totalTime,
  } = req.body;

  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (name) recipe.name = name;
    if (imageUrl) recipe.imageUrl = imageUrl;
    if (description) recipe.description = description;
    if (ingredients) recipe.ingredients = ingredients;
    if (steps) recipe.steps = steps;
    if (typeRecipe) recipe.typeRecipe = typeRecipe;
    if (totalTime) recipe.totalTime = totalTime;
    recipe.updateAt = new Date();

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.params.userId });
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.delete("/user/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({
      message: "Recipe deleted successfully",
      recipe: deletedRecipe,
    });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({
      message: "Error deleting recipe",
      error: error.message,
    });
  }
});

router.get("/:userId/favorites", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("favorite");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ favoriteIds: user.favorite.map((recipe) => recipe._id) });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
router.post("/user/list/favourites", async (req, res) => {
  try {
    const { ids } = req.body;
    console.log(ids);
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.json([]);
    }
    const query = { _id: { $in: ids } };
    const recipes = await Recipe.find(query);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/user/like/:recipeId", async (req, res) => {
  try {
    const { userId } = req.body;
    const { recipeId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.favorite.includes(recipeId)) {
      user.favorite.push(recipeId);
      await user.save();
      res.json({ message: "Recipe added to favorites" });
    } else {
      res.json({ message: "Recipe is already in favorites" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 3. Xóa món ăn khỏi danh sách yêu thích
router.delete("/user/unlike/:recipeId", async (req, res) => {
  try {
    const { userId } = req.body;
    const { recipeId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.favorite.includes(recipeId)) {
      user.favorite = user.favorite.filter((id) => id.toString() !== recipeId);
      await user.save();
      res.json({ message: "Recipe removed from favorites" });
    } else {
      res.json({ message: "Recipe is not in favorites" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/category/oke", async (req, res) => {
  try {
    const recipeTypes = await Recipe.aggregate([
      {
        $group: {
          _id: "$typeRecipe",
          firstImage: { $first: "$imageUrl" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          typeRecipe: "$_id",
          firstImage: { $arrayElemAt: ["$firstImage", 0] },
          count: 1,
        },
      },
    ]);

    res.json(recipeTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/list/byTypeRecipe", async (req, res) => {
  const { typeRecipe } = req.query;

  try {
    let recipes;

    if (typeRecipe) {
      recipes = await Recipe.find({ typeRecipe });
    } else {
      recipes = await Recipe.find();
    }

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
