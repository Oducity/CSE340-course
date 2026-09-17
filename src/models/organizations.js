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
export { getAllOrganizations, getOrganizationDetails };
