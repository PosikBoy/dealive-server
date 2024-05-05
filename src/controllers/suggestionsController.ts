import { Request, Response } from "express";

import suggestionsService from "../services/suggestionsService";

class SuggestionsController {
  async getSuggestions(req: Request, res: Response) {
    const query = req.body.query;
    try {
      const suggestions = await suggestionsService.getSuggestions(query);
      res.status(200).json({ suggestions });
    } catch (error) {
      res.status(400).json({ message: "Error occured" });
    }
  }
}

const suggestionsController = new SuggestionsController();
export default suggestionsController;
