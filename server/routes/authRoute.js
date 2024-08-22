import express from "express";
import {
  login,
  signup,
  verifyOtp,
  resendOtp,
} from "../controllers/authController.js";
import validate from "../middlewares/validate.js";
import { signupSchema, loginSchema } from "../schemas/authSchema.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Sign up a new student
 *     tags: [Auth]
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
 *                 format: email
 *               password:
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
 *         description: Student has been created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/signup", validate(signupSchema), signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login for student/admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
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
 *                 token:
 *                   type: string
 *       400:
 *         description: Wrong credentials
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
router.post("/login", validate(loginSchema), login);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verification successful
 *       400:
 *         description: Invalid OTP or OTP expired
 *       404:
 *         description: OTP not found
 *       500:
 *         description: Server error
 */
router.post("/verify-otp", verifyOtp);

/**
 * @swagger
 * /api/auth/resend-otp:
 *   post:
 *     summary: Resend OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: OTP resent successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
router.post("/resend-otp", resendOtp);

export default router;
