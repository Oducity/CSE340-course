// This is the organization page
import { getAllOrganizations } from "../models/organizations.js"; // import getAllOrganizations from organizations.js to get all organizations from the database

const showOrganizationsPage = async (req, res) => {
  const organizations = await getAllOrganizations(); // Fetch all organizations from the database
  const title = "Our Organizations Partners";
  res.render("organizations", { title, organizations }); // Render the "organizations" view and pass the title and organizations data to the template
};

// showOrganizationsPage export.
export { showOrganizationsPage };
