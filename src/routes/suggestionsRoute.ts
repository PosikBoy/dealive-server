import express from "express";
const router = express.Router();
import suggestionsController from "../controllers/suggestionsController";

router.post("/api/suggestions", suggestionsController.getSuggestions);

export default router;
