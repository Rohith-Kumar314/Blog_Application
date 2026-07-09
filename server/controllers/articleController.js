import mongoose from "mongoose";
import { Article } from "../models/articles.js";

export const getAllArticles = async (req, res) => {
  const allArticles = await Article.find({});
  res.status(200).json({
    success: true,
    message: "Articles fetched successfully",
    data: allArticles,
  });
};

export const createArticle = async (req, res) => {
  console.log(req.body);
  const { title, category, content, author } = req.body;
  try {
    if (!title || !category || !content || !author) {
      return res
        .status(403)
        .json({ success: false, message: "All fields are required" });
    }

    const newArticle = new Article(req.body);
    // also can be written as
    // const newArticle = new Article({
    // title
    // category
    // content
    // author
    //})

    const resp = await newArticle.save();
    res.status(201).json({
      success: true,
      message: "New Article Added Successfully",
      data: resp,
    });
  } catch (err) {
    console.log("Error ", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const editArticle = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res
        .status(403)
        .json({ success: false, message: "Artilce Id Required" });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid Article Id" });
    }
    const updatedArticle = await Article.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { returnDocument: "after", runValidators: true },
    );
    return res.status(200).json({success:true,message:"Article updated successfully", data:updatedArticle});
  } catch (err) {
    console.log("ERROR", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const archiveArticle = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res
        .status(403)
        .json({ success: false, message: "Artilce Id Required" });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid Article Id" });
    }
    const updatedArticle = await Article.findOneAndUpdate(
      { _id: id },
      { $set: { isActive: false} },
      { returnDocument: "after", runValidators: true },
    );

    return res.status(200).json({success:true,message:"The Article Archived successfully",data:updatedArticle});
  } catch (err) {
    console.log("ERROR", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res
        .status(403)
        .json({ success: false, message: "Artilce Id Required" });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid Article Id" });
    }
    const deletedArticle = await Article.findOneAndDelete({ _id: id }); //we can use findByIdAndDelete also but later we have to add condition for , who uses it .
    if (!deletedArticle) {
      return res.status(404).json({
        success: false,
        message: "Article Not Exists",
      });
    }
    res.status(201).json({
      success: true,
      message: "Article Deleted Successfully",
      data: deletedArticle,
    });
  } catch (err) {
    console.log("ERROR", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
