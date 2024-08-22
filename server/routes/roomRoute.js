import express from "express";
import {
  addStudentInRoom,
  approveRequest,
  createRoom,
  deleteRoom,
  getRoomRequests,
  getRooms,
  getSingleRoom,
  removeStudentFromRoom,
  roomRequest,
  updateRoom,
} from "../controllers/roomController.js";
import validate from "../middlewares/validate.js";
import { createRoomSchema, updateRoomSchema } from "../schemas/roomSchema.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room management
 */

/**
 * @swagger
 * /api/rooms/all:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   student_id:
 *                     type: array
 *                     items:
 *                       type: string
 *                   room_no:
 *                     type: number
 *                   room_type:
 *                     type: string
 *                   status:
 *                     type: string
 *                   price:
 *                     type: number
 *       404:
 *         description: Rooms not found
 *       500:
 *         description: Server error
 */
router.get("/all", verifyToken, getRooms);

/**
 * @swagger
 * /api/rooms/create:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_no:
 *                 type: number
 *               room_type:
 *                 type: string
 *                 enum: ["Single", "Double"]
 *               status:
 *                 type: string
 *                 enum: ["Available", "Occupied", "Maintenance"]
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 student_id:
 *                   type: array
 *                   items:
 *                     type: string
 *                 room_no:
 *                   type: number
 *                 room_type:
 *                   type: string
 *                 status:
 *                   type: string
 *                 price:
 *                   type: number
 *       400:
 *         description: Validation error
 *       403:
 *         description: Room already exists
 *       500:
 *         description: Server error
 */
router.post("/create", verifyToken, validate(createRoomSchema), createRoom);

/**
 * @swagger
 * /api/rooms/update/{id}:
 *   put:
 *     summary: Update a specific room by ID
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the room to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_no:
 *                 type: number
 *               room_type:
 *                 type: string
 *                 enum: ["Single", "Double"]
 *               status:
 *                 type: string
 *                 enum: ["Available", "Occupied", "Maintenance"]
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Room updated successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Room already exists
 *       404:
 *         description: Room not found
 *       500:
 *         description: Server error
 */
router.put("/update/:id", verifyToken, validate(updateRoomSchema), updateRoom);

/**
 * @swagger
 * /api/rooms/remove/{id}:
 *   delete:
 *     summary: Delete a specific room by ID
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the room to delete
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       404:
 *         description: Room not found
 *       500:
 *         description: Server error
 */
router.delete("/remove/:id", verifyToken, deleteRoom);

/**
 * @swagger
 * /api/rooms/approve:
 *   patch:
 *     summary: Approve or disapprove student's request for room change
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *               room_id:
 *                 type: string
 *               approved:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Room change request approved or disapproved
 *       400:
 *         description: Room not available or Student already exists in this room
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
router.patch("/approve", verifyToken, approveRequest);

/**
 * @swagger
 * /api/rooms/request/all:
 *   get:
 *     summary: Get all the students who have requested for a room or room change
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all students requesting room changes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   student_id:
 *                     type: string
 *                   room_id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   fee_status:
 *                     type: string
 *                   room_no:
 *                     type: string
 *                   room_price:
 *                     type: number
 *       404:
 *         description: Requested students not found
 *       500:
 *         description: Server error
 */
router.get("/request/all", verifyToken, getRoomRequests);

/**
 * @swagger
 * /api/rooms/remove-student/{id}:
 *   patch:
 *     summary: Remove student from room
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the student to remove from the room
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
 *         description: Student removed from room successfully
 *       404:
 *         description: Student or Room not found
 *       500:
 *         description: Server error
 */
router.patch("/remove-student/:id", verifyToken, removeStudentFromRoom);

// adds student in a room
router.patch("/add-student/:id", verifyToken, addStudentInRoom);

// fetches a specific room
router.get("/:id", verifyToken, getSingleRoom);

export default router;
