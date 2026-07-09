import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [8, "Title is atleast 8 Charecters"],
    },
    category: {
      type: String,
      enum: [
        "Science and Technology",
        "General",
        "Physics",
        "Chemistry",
        "Ennvironment",
        "Finance",
      ],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    isActice: {
      type: Boolean,
      default: true,
    },
    author: {
      type: Number, //can be later should be linked with user model after creating
    },
  },
  { timestamps: true },
);

export const Article = mongoose.model("Article", articleSchema);
