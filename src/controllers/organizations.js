// This is the organization page
import {
  getAllOrganizations,
  getOrganizationDetails,
  createOrganization,
} from "../models/organizations.js"; // import getAllOrganizations from organizations.js to get all organizations from the database
import { getProjectsByOrganizationId } from "../models/projects.js";

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

// This controller processes new organization
const processNewOrganizationForm = async (req, res) => {
  const { name, description, contactEmail } = req.body;

  const logoFilename = "placeholder-logo.png";

  const organizationId = await createOrganization(
    name,
    description,
    contactEmail,
    logoFilename,
  );

  res.redirect(`/organization/${organizationId}`);
};

export {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
};
