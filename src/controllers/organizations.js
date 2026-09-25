// This is the organization page
import { body, validationResult } from "express-validator";
import {
  getAllOrganizations,
  getOrganizationDetails,
  createOrganization,
  updateOrganization,
} from "../models/organizations.js"; // import getAllOrganizations from organizations.js to get all organizations from the database
import { getProjectsByOrganizationId } from "../models/projects.js";

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

const showOrganizationsPage = async (req, res) => {
  const organizations = await getAllOrganizations(); // Fetch all organizations from the database
  const title = "Our Organizations Partners";
  res.render("organizations", { title, organizations }); // Render the "organizations" view and pass the title and organizations data to the template
};

// This function uses the getOrganizationDetails and the  display the getProjectsByOrganizationId
// to display organization details with its respective projects.
const showOrganizationDetailsPage = async (req, res) => {
  const organizationId = req.params.id;
  const organizationDetails = await getOrganizationDetails(organizationId);
  const projects = await getProjectsByOrganizationId(organizationId);
  const title = "Organization Details";

  res.render("organization", { title, organizationDetails, projects });
};

// This controller shows form for creating mew organization
const showNewOrganizationForm = async (req, res) => {
  const title = "Add New Organization";
  res.render("new-organization", { title });
};

//************* */ This controller processes new organization  ********************
const processNewOrganizationForm = async (req, res) => {
  // Check for validation errors.
  const results = validationResult(req);
  if (!results.isEmpty()) {
    // If validation failed then through errors
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    // Redirect back to the new organization form.
    return res.redirect("/new-organization");
  }

  const { name, description, contactEmail } = req.body;
  const logoFilename = "placeholder-logo.png";
  const organizationId = await createOrganization(
    name,
    description,
    contactEmail,
    logoFilename,
  );

  req.flash("success", "Organization added successfully.");
  res.redirect(`/organization/${organizationId}`);
};

// The controller process the organization to be edited
const showEditOrganizationForm = async (req, res) => {
  const organizationId = req.params.id;
  const organizationDetails = await getOrganizationDetails(organizationId);

  const title = "Edit Organization";
  res.render("edit-organization", { title, organizationDetails });
};

const processEditOrganizationForm = async (req, res) => {
  // Check for validation errors.
  const results = validationResult(req);
  if (!results.isEmpty()) {
    // If validation failed then through errors
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    // Redirect back to the new organization form.
    return res.redirect(`/edit-organization/${req.params.id}`);
  }

  const organizationId = req.params.id;
  const { name, description, contactEmail, logoFilename } = req.body;

  await updateOrganization(
    organizationId,
    name,
    description,
    contactEmail,
    logoFilename,
  );

  req.flash("Success", "Organization updated successfully!");
  res.redirect(`/organization/${organizationId}`);
};

export {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  showEditOrganizationForm,
  processEditOrganizationForm,
  organizationValidation,
};
