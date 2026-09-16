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

  const queryParams = [organizationId];
  const result = await db.query(sqlQuery, queryParams);

  // Return the first row of the result set or null if no rows are found.
  return result.rows.length > 0 ? result.rows[0] : null;
};
export { getAllOrganizations, getOrganizationDetails };
