import express from "express";
import {
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  roomChangeRequest,
} from "../controllers/studentController.js";
import validate from "../middlewares/validate.js";
import { updateStudentSchema } from "../schemas/studentSchema.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management
 */

/**
 * @swagger
 * /api/students/all:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   hostel:
 *                     type: string
 *                   room_no:
 *                     type: string
 *                   fee_status:
 *                     type: string
 *       404:
 *         description: Students not found
 *       500:
 *         description: Server error
 */
router.get("/all", verifyToken, getAllStudents);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get a specific student by ID
 *     tags: [Students]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the student to retrieve
 *     responses:
 *       200:
 *         description: Student data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 profile_url:
 *                   type: string
 *                 college:
 *                   type: string
 *                   enum: ["Bahria University", "FAST University", "Karachi University", "NED University"]
 *                 course:
 *                   type: string
 *                   enum: ["Social Sciences", "Engineering", "Humanitarian", "Medical"]
 *                 hostel:
 *                   type: string
 *                   enum: ["Hostel1", "Hostel2", "Hostel3", "Hostel4"]
 *                 room_id:
 *                   type: string
 *                 room_change_request:
 *                   type: string
 *                 room_booked_until:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
router.get("/:id", verifyToken, getStudent);

/**
 * @swagger
 * /api/students/update/{id}:
 *   patch:
 *     summary: Update a specific student by ID
 *     tags: [Students]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the student to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               profile_url:
 *                 type: string
 *               college:
 *                 type: string
 *                 enum: ["Bahria University", "FAST University", "Karachi University", "NED University"]
 *               course:
 *                 type: string
 *                 enum: ["Social Sciences", "Engineering", "Humanitarian", "Medical"]
 *               hostel:
 *                 type: string
 *                 enum: ["Hostel1", "Hostel2", "Hostel3", "Hostel4"]
 *               room_id:
 *                 type: string
 *               room_change_request:
 *                 type: string
 *               room_booked_until:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
router.patch(
  "/update/:id",
  verifyToken,
  validate(updateStudentSchema),
  updateStudent
);

/**
 * @swagger
 * /api/students/room-change/{id}:
 *   patch:
 *     summary: Student's request for a room change
 *     tags: [Students]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the student requesting the room change
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_no:
 *                 type: string
 *     responses:
 *       200:
 *         description: Room change request successful
 *       404:
 *         description: Student not found
 *       409:
 *         description: Room already occupied
 *       500:
 *         description: Server error
 */
router.patch(
  "/room-change/:id",
  verifyToken,
  validate(updateStudentSchema),
  roomChangeRequest
);

/**
 * @swagger
 * /api/students/remove/{id}:
 *   delete:
 *     summary: Delete a specific student by ID
 *     tags: [Students]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the student to delete
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
router.delete("/remove/:id", verifyToken, deleteStudent);

export default router;
