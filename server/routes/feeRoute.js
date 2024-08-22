import express from "express";
import {
  createFeeVoucher,
  generateFeeVoucher,
  getFees,
  getVouchersMonth,
  getVouchersStudent,
  updateVoucher,
} from "../controllers/feeController.js";
import validate from "../middlewares/validate.js";
import { createFeeSchema } from "../schemas/feeSchema.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Fees
 *   description: Fee management
 */

/**
 * @swagger
 * /api/fees/all:
 *   get:
 *     summary: Get all fees records
 *     tags: [Fees]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all fees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                   year:
 *                     type: number
 *                   amount:
 *                     type: number
 *                   due_date:
 *                     type: string
 *                     format: date
 *                   consumer_id:
 *                     type: string
 *       404:
 *         description: Fees not found
 *       500:
 *         description: Server error
 */
router.get("/all", verifyToken, getFees);

/**
 * @swagger
 * /api/fees/create:
 *   post:
 *     summary: Create a fee voucher
 *     tags: [Fees]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               month:
 *                 type: string
 *                 enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
 *               year:
 *                 type: number
 *               amount:
 *                 type: number
 *               due_date:
 *                 type: string
 *                 format: date
 *               consumer_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fee voucher created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 month:
 *                   type: string
 *                 year:
 *                   type: number
 *                 amount:
 *                   type: number
 *                 due_date:
 *                   type: string
 *                   format: date
 *                 consumer_id:
 *                   type: string
 *       400:
 *         description: Validation error
 *       403:
 *         description: Voucher already exists for the specified month and year
 *       500:
 *         description: Server error
 */
router.post(
  "/create",
  verifyToken,
  validate(createFeeSchema),
  createFeeVoucher
);

/**
 * @swagger
 * /api/fees/generate-voucher/{id}:
 *   get:
 *     summary: Generate a fee voucher for a student
 *     tags: [Fees]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the student to generate a fee voucher for
 *     responses:
 *       200:
 *         description: Fee voucher generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fee_id:
 *                   type: string
 *                 student_id:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 status:
 *                   type: string
 *                   enum: ["Paid", "Unpaid", "Pending"]
 *       400:
 *         description: Student must be assigned a room before generating voucher
 *       404:
 *         description: Current month's voucher hasn't been created or student not found
 *       500:
 *         description: Server error
 */
router.get("/generate-voucher/:id", verifyToken, generateFeeVoucher);

/**
 * @swagger
 * /api/fees/month/{month}:
 *   get:
 *     summary: Get all vouchers based on the provided month
 *     tags: [Fees]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: month
 *         in: path
 *         required: true
 *         description: The month for which to retrieve the vouchers
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all vouchers for the specified month
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the student
 *                   email:
 *                     type: string
 *                     description: The email of the student
 *                   room_no:
 *                     type: string
 *                     description: The room number of the student
 *                   amount:
 *                     type: number
 *                     format: float
 *                     description: The amount of the voucher
 *                   status:
 *                     type: string
 *                     description: The status of the voucher
 *                     enum: ["Paid", "Unpaid", "Pending"]
 *       404:
 *         description: Fees for the specified month not found or vouchers not found
 *       500:
 *         description: Server error
 */
router.get("/month/:month/:year", verifyToken, getVouchersMonth);

/**
 * @swagger
 * /api/fees/vouchers/{id}:
 *   get:
 *     summary: Get all vouchers based on student ID
 *     tags: [Fees]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the student to get vouchers for
 *     responses:
 *       200:
 *         description: List of all vouchers for the specified student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                   year:
 *                     type: number
 *                   amount:
 *                     type: number
 *                   due_date:
 *                     type: string
 *                     format: date
 *                   consumer_id:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: ["Paid", "Unpaid", "Pending"]
 *       404:
 *         description: Vouchers not found
 *       500:
 *         description: Server error
 */
router.get("/vouchers/:id", verifyToken, getVouchersStudent);

/**
 * @swagger
 * /api/fees/update-voucher/{id}:
 *   patch:
 *     summary: Change fee status of a student
 *     tags: [Fees]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the student to change fee status for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               month:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fee status changed successfully
 *       404:
 *         description: Fee or Voucher not found
 *       500:
 *         description: Server error
 */
router.patch("/update-voucher/:id", verifyToken, updateVoucher);

export default router;
