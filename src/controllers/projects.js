// This is the projects page
import { getAllProjects } from "../models/projects.js"; // import getAllProjects from projects.js to get all projects from the database

const showProjectsPage = async (req, res) => {
  const projects = await getAllProjects(); // Fetch all projects from the database
  const title = "Service Projects";
  res.render("projects", { title, projects }); // Render the "projects" view and pass the title and projects data to the template
};

// showProjectsPage exported.
export { showProjectsPage };
