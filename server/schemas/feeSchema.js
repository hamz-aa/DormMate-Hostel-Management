import { z } from "zod";

export const createFeeSchema = z.object({
  month: z.enum([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]),
  year: z
    .number()
    .int()
    .min(1900, "Year must be valid")
    .max(2100, "Year must be valid"),
  amount: z.number().positive("Amount must be a positive number"),
  due_date: z.string(),
  consumer_id: z.string().min(1, "Consumer ID is required"),
});
