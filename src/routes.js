import express from "express";

import { showHomePage } from "./controllers/index.js";
import {
  organizationValidation,
  projectValidation,
  categoryValidation,
  userValidation,
} from "./validation/validation.js";

import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  showEditOrganizationForm,
  processEditOrganizationForm,
} from "./controllers/organizations.js";
import {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  showEditProjectForm,
  processEditProjectForm,
} from "./controllers/projects.js";
import {
  showCategoryPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showAddNewCategoryForm,
  processAddNewCategoryForm,
  showUpdateCategoryForm,
  processUpdateCategoryForm,
} from "./controllers/categories.js";
import {
  showUserRegistrationForm,
  processUserRegistrationForm,
  showLoginForm,
  processLoginForm,
  processLogout,
  requireLogin,
  showDashboard
} from "./controllers/users.js";
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

//The route for new-project form display
router.get("/new-projectFormPage", showNewProjectForm);

// This route display the form for assigning a project to categories
router.get("/assign-categories/:id", showAssignCategoriesForm);

// route handle routes to the form for editing a project.
router.get("/edit-project/:id", showEditProjectForm);

// This route handles the new-categoryForm page
router.get("/new-categoryForm", showAddNewCategoryForm);

// This route get the display the updateCategoryForm.ejs
router.get("/updateCategoryForm/:id", showUpdateCategoryForm);

// This route display the user registration form
router.get("/register", showUserRegistrationForm);

// This route display the user login form
router.get("/login", showLoginForm);

// This route handles the user logout process
router.get("/logout", processLogout);

// This route displays the user dashboard page
router.get("/dashboard", requireLogin, showDashboard);

// The route for processing the processNewProjectForm function controller
// for the submission of the form to the database.
router.post("/new-projectFormPage", projectValidation, processNewProjectForm);

// Route to handle the new organization form submission
router.post(
  "/new-organization",
  organizationValidation,
  processNewOrganizationForm,
);

// This route handles the form page and the controller that
// controls the model for editing the organization in the database
router.post(
  "/edit-organization/:id",
  organizationValidation,
  processEditOrganizationForm,
);

// This route handles the form and processes the form
// submission to link a project to categories
router.post("/assign-categories/:id", processAssignCategoriesForm);

// This route processes the edit-project.ejs form page.
router.post("/edit-project/:id", processEditProjectForm);

// This route handles the new-categoryForm registration using post method
router.post("/new-categoryForm", categoryValidation, processAddNewCategoryForm);

// This route handles the updateCategoryForm submission
router.post(
  "/updateCategoryForm/:id",
  categoryValidation,
  processUpdateCategoryForm,
);

// This route processes the new user registration form submission
router.post("/register", userValidation, processUserRegistrationForm);

// This route handles the user login form submission
router.post("/login", processLoginForm);

//Error handler route.
router.get("/test-error", testErrorPage);

// Export the router object.
export default router;
