import { z } from "zod";

export const createRoomSchema = z.object({
  room_no: z.number().int().positive("Room number must be a positive integer"),
  room_type: z.enum(
    ["Single", "Double"],
    "Room type must be 'Single' or 'Double'"
  ),
  status: z
    .enum(
      ["Available", "Occupied", "Maintenance"],
      "Status must be 'Available', 'Occupied' or 'Maintenance'"
    )
    .optional(),
  price: z.number().positive("Price must be a positive number"),
});

export const updateRoomSchema = z.object({
  room_no: z
    .number()
    .int()
    .positive("Room number must be a positive integer")
    .optional(),
  room_type: z
    .enum(["Single", "Double"], "Room type must be 'Single' or 'Double'")
    .optional(),
  status: z
    .enum(
      ["Available", "Occupied", "Maintenance"],
      "Status must be 'Available', 'Occupied' or 'Maintenance"
    )
    .optional(),
  price: z.number().positive("Price must be a positive number").optional(),
});
