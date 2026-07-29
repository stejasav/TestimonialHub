import { body, validationResult } from "express-validator";

export const validateTestimonial = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Invalid email address"),
  body("company").trim().notEmpty().withMessage("Company is required"),
  body("testimonial")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Testimonial must be at least 10 characters long"),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be a number between 1 and 5"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }
    next();
  },
];
