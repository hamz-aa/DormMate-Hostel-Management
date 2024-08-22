import express from "express";
import {
  createSuggestion,
  deleteSuggestion,
  getSuggestions,
} from "../controllers/suggestionController.js";
import validate from "../middlewares/validate.js";
import { createSuggestionSchema } from "../schemas/suggestionSchema.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Suggestions
 *   description: Suggestion management
 */

/**
 * @swagger
 * /api/suggestions:
 *   get:
 *     summary: Get all suggestions
 *     tags: [Suggestions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all suggestions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   description:
 *                     type: string
 *       404:
 *         description: Suggestions not found
 *       500:
 *         description: Server error
 */
router.get("/", verifyToken, getSuggestions);

/**
 * @swagger
 * /api/suggestions/create:
 *   post:
 *     summary: Create a new suggestion
 *     tags: [Suggestions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Suggestion created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 description:
 *                   type: string
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/create",
  verifyToken,
  validate(createSuggestionSchema),
  createSuggestion
);

/**
 * @swagger
 * /api/suggestions/remove/{id}:
 *   delete:
 *     summary: Delete a suggestion
 *     tags: [Suggestions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the suggestion to delete
 *     responses:
 *       200:
 *         description: Suggestion deleted successfully
 *       404:
 *         description: Suggestion not found
 *       500:
 *         description: Server error
 */
router.delete("/remove/:id", verifyToken, deleteSuggestion);

export default router;
