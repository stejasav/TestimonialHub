import Testimonial from "../models/Testimonial.js";
import { analyzeTestimonialAI } from "./aiService.js";
import STATUS from "../constants/status.js";

export const createTestimonialService = async (data) => {
  const { email, testimonial: testimonialText } = data;

  // Check duplicate
  const existing = await Testimonial.findOne({
    email,
    testimonial: testimonialText,
  });

  if (existing) {
    const error = new Error("Duplicate testimonial has already been submitted.");
    error.statusCode = 400;
    throw error;
  }

  // AI Sentiment Analysis
  const aiAnalysis = await analyzeTestimonialAI(testimonialText);

  const testimonial = await Testimonial.create({
    ...data,
    status: STATUS.PENDING,
    sentiment: aiAnalysis.sentiment,
    summary: aiAnalysis.summary,
    keywords: aiAnalysis.keywords,
    category: aiAnalysis.category,
    moderationSuggestion: aiAnalysis.moderationSuggestion,
  });

  return testimonial;
};

export const getAllTestimonialsService = async (page = 1, limit = 50) => {
  const skip = (page - 1) * limit;

  const testimonials = await Testimonial.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Testimonial.countDocuments();

  return {
    testimonials,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

export const getTestimonialStatsService = async () => {
  const pending = await Testimonial.countDocuments({ status: STATUS.PENDING });
  const approved = await Testimonial.countDocuments({ status: STATUS.APPROVED });
  const rejected = await Testimonial.countDocuments({ status: STATUS.REJECTED });
  const total = await Testimonial.countDocuments();

  return { pending, approved, rejected, total };
};

export const getApprovedTestimonialsService = async () => {
  return await Testimonial.find({ status: STATUS.APPROVED }).sort({ createdAt: -1 });
};

export const approveTestimonialService = async (id) => {
  const testimonial = await Testimonial.findByIdAndUpdate(
    id,
    { status: STATUS.APPROVED },
    { new: true }
  );

  if (!testimonial) {
    const error = new Error("Testimonial not found");
    error.statusCode = 404;
    throw error;
  }

  return testimonial;
};

export const rejectTestimonialService = async (id) => {
  const testimonial = await Testimonial.findByIdAndUpdate(
    id,
    { status: STATUS.REJECTED },
    { new: true }
  );

  if (!testimonial) {
    const error = new Error("Testimonial not found");
    error.statusCode = 404;
    throw error;
  }

  return testimonial;
};
