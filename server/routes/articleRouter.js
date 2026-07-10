import { Router } from "express";
import { archiveArticle, createArticle, deleteArticle, editArticle, getAllArticles } from "../controllers/articleController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const articleRouter = Router();

articleRouter.get("/",asyncHandler(getAllArticles));
articleRouter.post("/",asyncHandler(createArticle));
articleRouter.put("/:id",asyncHandler(editArticle));
articleRouter.patch("/:id",asyncHandler(archiveArticle));
articleRouter.delete("/:id",asyncHandler(deleteArticle));