// This is the projects page
import {
  getAllProjects,
  getUpcomingProjects,
  getProjectDetails,
  getProjectsDetailsByCategoryId,
  getAllCategoryTagsByProjectId,
} from "../models/projects.js"; // import getAllProjects from projects.js to get all projects from the database

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
  const tag = await getAllCategoryTagsByProjectId(projectId);
  const categoryTag = tag === null ? [] : tag;
  const title = "Project Details";

  if (projectDetails === null) {
    const err = new Error("Project Details Not Found");
    err.status = 404;
    return next(err);
  }
  res.render("project", {
    title,
    projectDetails,
    categoryTag,
  });
};

// showProjectsPage exported.
export { showProjectsPage, showProjectDetailsPage };
