import express from "express";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
} from "../controllers/announcementController.js";
import { verifyToken } from "../verifyToken.js";
import validate from "../middlewares/validate.js";
import { createAnnouncementSchema } from "../schemas/announcementSchema.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: Announcement management
 */

/**
 * @swagger
 * /api/announcements/all:
 *   get:
 *     summary: Get all announcements
 *     tags: [Announcements]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all announcements
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
 *         description: Announcements not found
 *       500:
 *         description: Server error
 */
router.get("/all", getAnnouncements);

/**
 * @swagger
 * /api/announcements/create:
 *   post:
 *     summary: Create a new announcement
 *     tags: [Announcements]
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
 *         description: Announcement created successfully
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
  validate(createAnnouncementSchema),
  createAnnouncement
);

/**
 * @swagger
 * /api/announcements/remove/{id}:
 *   delete:
 *     summary: Delete an announcement
 *     tags: [Announcements]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the announcement to delete
 *     responses:
 *       200:
 *         description: Announcement deleted successfully
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Server error
 */
router.delete("/remove/:id", verifyToken, deleteAnnouncement);

export default router;
