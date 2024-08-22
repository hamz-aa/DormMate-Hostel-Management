import { z } from "zod";

export const updateStudentSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
  college: z
    .enum([
      "Bahria University",
      "FAST University",
      "Karachi University",
      "NED University",
    ])
    .optional(),
  course: z
    .enum(["Social Sciences", "Engineering", "Humanitarian", "Medical"])
    .optional(),
  hostel: z.enum(["Hostel1", "Hostel2", "Hostel3", "Hostel4"]).optional(),
  room_id: z.string().optional(),
  room_change_request: z.string().optional(),
  room_booked_until: z.date().optional(),
});
