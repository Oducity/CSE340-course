import { body } from "express-validator";

// Validation rule for organization insertion
const organizationValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Organization name is required")
    .isLength({ min: 3, max: 150 })
    .withMessage("Organization name must be between 3 and 150 characters."),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Organization description is required")
    .isLength({ max: 500 })
    .withMessage("Organization description can not exceed 500 characters."),
  body("contactEmail")
    .trim()
    .notEmpty()
    .withMessage("Contact email is required")
    .isEmail()
    .withMessage("Please provide a valid email address."),
];

// Validation rules for project insertion
const projectValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Project title must be between 3 and 150 characters."),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Project description is required")
    .isLength({ max: 999 })
    .withMessage("Project description can not exceed 1000 characters."),
  body("project_location")
    .trim()
    .notEmpty()
    .withMessage("Project location is required")
    .isLength({ min: 2, max: 200 })
    .withMessage("Project location must be between 3 and 255 characters"),
  body("project_date")
    .trim()
    .notEmpty()
    .withMessage("Project date is required")
    .isDate()
    .withMessage("A project must have valid date."),
  body("organization_id")
    .trim()
    .notEmpty()
    .withMessage("An organization is required")
    .isInt()
    .withMessage("Organization must be integer value"),
];

export { organizationValidation, projectValidation };
