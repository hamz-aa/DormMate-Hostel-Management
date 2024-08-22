import { createError } from "../error.js";
import Announcement from "../models/Announcement.js";

export const getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    if (!announcements || !announcements.length)
      return next(createError(404, "Announcements not found!"));
    res.status(200).json(announcements);
  } catch (error) {
    next(error);
  }
};

export const createAnnouncement = async (req, res, next) => {
  try {
    const announcement = new Announcement(req.body);
    const response = await announcement.save();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return next(createError(404, "Announcement not found!"));
    await Announcement.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Announcement deleted successfully!" });
  } catch (error) {
    next(error);
  }
};
