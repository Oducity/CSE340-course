import express from "express";

import { showHomePage } from "./controllers/index.js";
import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
} from "./controllers/organizations.js";
import {
  showProjectsPage,
  showProjectDetailsPage,
} from "./controllers/projects.js";
import { showCategoryPage } from "./controllers/categories.js";
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
router.get("/projects", showProjectDetailsPage);

// Category page route handler
router.get("/category", showCategoryPage);

// Organization details page route
router.get("/organization/:id", showOrganizationDetailsPage);
//Error handler route.
router.get("/test-error", testErrorPage);

// Export the router object.
export default router;
