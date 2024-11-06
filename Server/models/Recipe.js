const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: String,
  imageUrl: [String],
  description: String,
  ingredients: [
    {
      imageUrl: String,
      name: String,
      measurement: String,
    },
  ],
  steps: [
    {
      imageUrl: String,
      stepName: String,
      description: String,
      time: Number,
    },
  ],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      description: String,
      rating: Number,
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createAt: Date,
  updateAt: Date,
  typeRecipe: String,
  totalTime: Number,
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
