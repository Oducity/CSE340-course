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

// This function validate category data
const categoryValidation = [
  body("category_name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Category name should between 3 to 100 characters."),
  body("category_description")
    .trim()
    .notEmpty()
    .withMessage("Category description is required")
    .isLength({ min: 30, max: 500 })
    .withMessage(
      "Category description should be between 30 to 500 characters.",
    ),
];

const userValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("User name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("User name must be between 2 and 100 characters."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("User email is required")
    .isEmail()
    .withMessage("Please provide a valid email address."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("User password is required")
    .isLength({ min: 6, max: 100 })
    .withMessage("User password must be between 6 and 100 characters."),
];

export { organizationValidation, projectValidation, categoryValidation, userValidation };
