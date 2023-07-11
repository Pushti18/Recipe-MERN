// import mongoose from "mongoose";

// const RecipeSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//     description: {
//     type: String,
//     required: true,
//   },
//   ingredients: [
//     {
//       type: String,
//       required: true,
//     },
//   ],
//   instructions: {
//     type: String,
//     required: true,
//   },

//   imageUrl: {
//     type: String,
//     required: true,
//   },
//   cookingTime: {
//     type: Number,
//     required: true,
//   },
//   userOwner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   categories: {
//     type: String,
//     required: true,
//   }
// });

// export const RecipesModel = mongoose.model("recipes", RecipeSchema);

import mongoose from "mongoose";

const RecipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  youtubeVideoUrl: {
    type: String, // Assuming the URL will be stored as a string
    required: false, // Optional field, not required
  },
});

export const RecipesModel = mongoose.model("recipes", RecipeSchema);

