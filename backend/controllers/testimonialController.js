import {
  createTestimonialService,
  getAllTestimonialsService,
  getTestimonialStatsService,
  getApprovedTestimonialsService,
  approveTestimonialService,
  rejectTestimonialService,
} from "../services/testimonialService.js";
import { sendResponse } from "../utils/response.js";

// Create a new testimonial
const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await createTestimonialService(req.body);
    return sendResponse(
      res,
      201,
      true,
      "Testimonial submitted successfully",
      testimonial
    );
  } catch (error) {
    next(error);
  }
};

// Get all testimonials with optional pagination
const getAllTestimonials = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;

    const result = await getAllTestimonialsService(page, limit);

    return res.status(200).json({
      success: true,
      message: "Testimonials retrieved successfully",
      count: result.testimonials.length,
      total: result.total,
      page: result.page,
      pages: result.pages,
      data: result.testimonials,
    });
  } catch (error) {
    next(error);
  }
};

// Get stats breakdown
const getTestimonialStats = async (req, res, next) => {
  try {
    const stats = await getTestimonialStatsService();
    return sendResponse(res, 200, true, "Stats retrieved successfully", stats);
  } catch (error) {
    next(error);
  }
};

// Get approved testimonials
const getApprovedTestimonials = async (req, res, next) => {
  try {
    const testimonials = await getApprovedTestimonialsService();
    return res.status(200).json({
      success: true,
      message: "Approved testimonials retrieved successfully",
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
};

// Approve testimonial
const approveTestimonial = async (req, res, next) => {
  try {
    const testimonial = await approveTestimonialService(req.params.id);
    return sendResponse(
      res,
      200,
      true,
      "Testimonial approved successfully",
      testimonial
    );
  } catch (error) {
    next(error);
  }
};

// Reject testimonial
const rejectTestimonial = async (req, res, next) => {
  try {
    const testimonial = await rejectTestimonialService(req.params.id);
    return sendResponse(
      res,
      200,
      true,
      "Testimonial rejected successfully",
      testimonial
    );
  } catch (error) {
    next(error);
  }
};

export {
  createTestimonial,
  getAllTestimonials,
  getTestimonialStats,
  getApprovedTestimonials,
  approveTestimonial,
  rejectTestimonial,
};