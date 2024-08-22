import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  college: z.enum([
    "Bahria University",
    "FAST University",
    "Karachi University",
    "NED University",
  ]),
  course: z.enum(["Social Sciences", "Engineering", "Humanitarian", "Medical"]),
  hostel: z.enum(["Hostel1", "Hostel2", "Hostel3", "Hostel4"]),
  room_no: z.string().optional(),
  room_type: z.enum(["Single", "Double", "Unassigned"]).optional(),
  fee_status: z.enum(["Paid", "Unpaid", "Pending", "N/A"]).optional(),
  room_change_request: z.string().optional(),
  room_booked_until: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
