import db from "./db.js";

// Function to query organization table
const getAllOrganizations = async () => {
  const sqlQuery = `
    SELECT
      organization_id,
      organization_name,
      organization_email,
      description,
      logo_filename
    FROM organizations;
                    `;
  const result = await db.query(sqlQuery);
  return result.rows;
};

const getOrganizationDetails = async (organizationId) => {
  const sqlQuery = `
    SELECT
      organization_id,
      organization_name,
      organization_email,
      description,
      logo_filename
    FROM organizations
    WHERE organization_id = $1;
  `;

  /**
   * IMPORTANT SECURITY NOTE
   * Notice that this function uses a parameterized query to safely include the organization ID in the SQL statement,
   * which helps prevent SQL injection attacks. If you included the organization ID directly in the query string,
   * it could allow malicious users to execute arbitrary SQL commands.
   * In this course, you should always use parameterized queries when including user input in SQL statements.
   * Never put the user input directly into the query string.
   */

  const queryParams = [organizationId]; // The user input value contained in organizationId is stored in a variable called queryParams.
  const result = await db.query(sqlQuery, queryParams); // The queryParams is passed to the database to be safely substituted for
  // the organization_id in the WHERE clause by the database itself for safe and secure query/filter

  // Return the first row of the result set or null if no rows are found.
  return result.rows.length > 0 ? result.rows[0] : null;
};

/**
 * Creates a new organization in the database.
 * @param {string} name - The name of the organization.
 * @param {string} description - The description of the organization.
 * @param {string} contactEmail - Th contact email of the organization.
 * @param {string} logoFilename - The file name of the organization logo
 * @returns {string} The id of the newly created organization record
 */

const createOrganization = async (
  name,
  description,
  contactEmail,
  logoFilename,
) => {
  const sqlQuery = `
    INSERT INTO organizations (
      organization_name,
      description,
      organization_email,
      logo_filename
	)
    VALUES($1, $2, $3, $4)
    RETURNING organization_id
  `;
  const queryParams = [name, description, contactEmail, logoFilename];
  const result = await db.query(sqlQuery, queryParams);

  if (result.rows.length === 0) {
    throw new Error("Failed to create organization");
  }

  if (process.env.ENABLE_SQL_LOGGING === "true") {
    console.log(
      "Created new organization with ID:",
      result.rows[0].organization_id,
    );
  }

  return result.rows[0].organization_id;
};

// This model updates the organization in the database.
const updateOrganization = async (
  organizationId,
  organization_name,
  description,
  organizationEmail,
  logoFilename,
) => {
  const sqlUpdate = `
    UPDATE organizations
    SET organization_name = $1, description = $2, organization_email = $3, logo_filename = $4
    WHERE organization_id = $5
    RETURNING organization_id;
  `;
  const queryParams = [
    organization_name,
    description,
    organizationEmail,
    logoFilename,
    organizationId,
  ];

  const results = await db.query(sqlUpdate, queryParams);

  if (results.rows.length === 0) {
    throw new Error("Organization not found");
  }

  if (process.env.ENABLE_SQL_LOGGING === "true") {
    console.log("Updated organization with ID: ", organizationId);
  }

  return results.rows[0].organization_id;
};
export {
  getAllOrganizations,
  getOrganizationDetails,
  createOrganization,
  updateOrganization,
};
