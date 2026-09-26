// This is the projects page
import {
  getAllProjects,
  getUpcomingProjects,
  getProjectDetails,
  getProjectsDetailsByCategoryId,
  getAllCategoryTagsByProjectId,
  createProject,
} from "../models/projects.js"; // import getAllProjects from projects.js to get all projects from the database
import { getAllOrganizations } from "../models/organizations.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
  //const projects = await getAllProjects(); // Fetch all projects from the database
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  const title = "Upcoming Service Projects";
  res.render("projects", { title, projects }); // Render the "projects" view and pass the title and projects data to the template
};

const showProjectDetailsPage = async (req, res, next) => {
  const projectId = req.params.id;
  const projectDetails = await getProjectDetails(projectId);
  const categoryTag = await getAllCategoryTagsByProjectId(projectId);

  if (categoryTag === "compromised") {
    const err = new Error("Server Error");
    err.status = 500;
    return next(err);
  }

  if (projectDetails === null) {
    const err = new Error("Project Details Not Found");
    err.status = 404;
    return next(err);
  }

  const title = "Project Details";
  res.render("project", {
    title,
    projectDetails,
    categoryTag,
  });
};

// This controller function handles the createProject model function.
const showNewProjectForm = async (req, res) => {
  const allOrganization = await getAllOrganizations();

  const title = "Add New Service Project";
  res.render("new-projectFormPage", { title, allOrganization });
};

// This controller function process the new project form
const processNewProjectForm = async (req, res) => {
  // Check for validation errors.
  const results = validationResult(req);
  if (!results.isEmpty()) {
    // If validation failed then through errors
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    // Redirect back to the new organization form.
    return res.redirect(`/new-projectFormPage/`);
  }
  try {
    // Destructure the project data from the form using req.body parameter.
    const [
      organization_id,
      title,
      description,
      project_location,
      project_date,
    ] = req.body;
    //pass project data to the model function that create the new project
    const createdProjectId = await createProject(
      organization_id,
      title,
      description,
      project_location,
      project_date,
    );

    req.flash("Success", "Project created successfully!");
    res.redirect(`/project/${createdProjectId}`);
  } catch (error) {
    console.error(`Error creating new project: ${error}`);
    req.flash("Error creating new project!");
    res.redirect("new-projectFormPage");
  }
};

// showProjectsPage exported.
export {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
};
