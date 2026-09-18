// This is the projects page
import {
  getAllProjects,
  getUpcomingProjects,
  getProjectDetails,
} from "../models/projects.js"; // import getAllProjects from projects.js to get all projects from the database

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
  //const projects = await getAllProjects(); // Fetch all projects from the database
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  const title = "Upcoming Service Projects";
  res.render("projects", { title, projects }); // Render the "projects" view and pass the title and projects data to the template
};

const showProjectDetailsPage = async (req, res) => {
  const projectId = req.params.id;
  const projectDetails = await getProjectDetails(projectId);
  const title = "Project Details";
  res.render("project", { title, projectDetails });
};

// showProjectsPage exported.
export { showProjectsPage, showProjectDetailsPage };
