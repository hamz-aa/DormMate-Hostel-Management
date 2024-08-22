import { z } from "zod";

export const createAnnouncementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string({ required_error: "Date is required" }),
  description: z.string().min(1, "Description is required"),
});
