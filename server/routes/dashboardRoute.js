import express from "express";
import {
  getAdminDashboard,
  getStudentDashboard,
} from "../controllers/dashboard.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard management
 */

/**
 * @swagger
 * /api/dashboard/admin:
 *   get:
 *     summary: Get admin dashboard data
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalStudents:
 *                   type: number
 *                 availableRooms:
 *                   type: number
 *                 availableBeds:
 *                   type: number
 *                 paidVouchers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fee_id:
 *                         type: string
 *                       student_id:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       status:
 *                         type: string
 *                         enum: ["Paid", "Unpaid", "Pending"]
 *                 unpaidVouchers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fee_id:
 *                         type: string
 *                       student_id:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       status:
 *                         type: string
 *                         enum: ["Paid", "Unpaid", "Pending"]
 *                 feesCollected:
 *                   type: number
 *                 suggestions:
 *                   type: number
 *                 paymentHistory:
 *                   type: object
 *                   additionalProperties:
 *                     type: number
 *                 hostelProgress:
 *                   type: object
 *                   additionalProperties:
 *                     type: number
 *       500:
 *         description: Server error
 */
router.get("/admin", verifyToken, getAdminDashboard);

/**
 * @swagger
 * /api/dashboard/student:
 *   get:
 *     summary: Get student dashboard data
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Student dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalAnnouncements:
 *                   type: number
 *       500:
 *         description: Server error
 */
router.get("/student/:id", verifyToken, getStudentDashboard);

export default router;
