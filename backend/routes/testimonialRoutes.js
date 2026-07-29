import express from "express";

import {
  createTestimonial,
  getAllTestimonials,
  getTestimonialStats,
  getApprovedTestimonials,
  approveTestimonial,
  rejectTestimonial,
} from "../controllers/testimonialController.js";
import { validateTestimonial } from "../middleware/validateTestimonial.js";

const router = express.Router();

router.post("/", validateTestimonial, createTestimonial);

router.get("/", getAllTestimonials);

router.get("/stats", getTestimonialStats);

router.get("/approved", getApprovedTestimonials);

router.patch("/:id/approve", approveTestimonial);

router.patch("/:id/reject", rejectTestimonial);

export default router;