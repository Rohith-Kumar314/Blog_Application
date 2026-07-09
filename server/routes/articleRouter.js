import { Router } from "express";
import { archiveArticle, createArticle, deleteArticle, editArticle, getAllArticles } from "../controllers/articleController.js";

export const articleRouter = Router();

articleRouter.get("/",getAllArticles);
articleRouter.post("/",createArticle);
articleRouter.put("/:id",editArticle);
articleRouter.patch("/:id",archiveArticle);
articleRouter.delete("/:id",deleteArticle);
