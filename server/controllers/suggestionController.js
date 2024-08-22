import Suggestion from "../models/Suggestion.js";
import { createError } from "../error.js";

export const getSuggestions = async (req, res, next) => {
  try {
    const allSuggestions = await Suggestion.find().sort({ createdAt: -1 });
    if (!allSuggestions || !allSuggestions.length)
      return next(createError(404, "Suggestions not found!"));
    res.status(200).json(allSuggestions);
  } catch (error) {
    next(error);
  }
};

export const createSuggestion = async (req, res, next) => {
  try {
    const suggestion = new Suggestion(req.body);
    const result = await suggestion.save();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteSuggestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const suggestion = await Suggestion.findById(id);
    if (!suggestion) return next(createError(404, "Suggestion not found!"));
    await Suggestion.findByIdAndDelete(id);
    res.status(200).json("Suggestion successfully deleted!");
  } catch (error) {
    next(error);
  }
};
