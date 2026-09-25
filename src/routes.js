import express from "express";

import { showHomePage } from "./controllers/index.js";
import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  organizationValidation,
  showEditOrganizationForm,
} from "./controllers/organizations.js";
import {
  showProjectsPage,
  showProjectDetailsPage,
} from "./controllers/projects.js";
import {
  showCategoryPage,
  showCategoryDetailsPage,
} from "./controllers/categories.js";
import { testErrorPage } from "./controllers/errors.js";

const router = express.Router();

// Route handlers for different paths.
// Each route sends a specific HTML file as a response.
router.get("/", showHomePage);

// organization route handler
router.get("/organizations", showOrganizationsPage);

// Projects page route handler
router.get("/projects", showProjectsPage);

// Project page route handler by projectId
router.get("/project/:id", showProjectDetailsPage);

// Category page route handler
router.get("/category", showCategoryPage);

// This category related projects page handler
router.get("/category/:id", showCategoryDetailsPage);

// Organization details page route
router.get("/organization/:id", showOrganizationDetailsPage); // ####################################

// The route handler for new-organization form
router.get("/new-organization", showNewOrganizationForm);

//The route for to show edit organization form
router.get("/edit-organization/:id", showEditOrganizationForm);

// Route to handle the new organization form submission
router.post(
  "/new-organization",
  organizationValidation,
  processNewOrganizationForm,
); //************************************* */
//Error handler route.
router.get("/test-error", testErrorPage);

// Export the router object.
export default router;
