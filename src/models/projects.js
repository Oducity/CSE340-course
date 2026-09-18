import db from "./db.js"; // import the database connection from db.js to interact with the database

// Define an asynchronous function getAllProjects to fetch all projects from the database along with their associated organization names.
// The function constructs a SQL query that selects the organization name, project title, description, location, and date from the projects table,
// joining it with the organizations table based on the organization_id. It then executes the query using the db.query method and returns the resulting rows.
const getAllProjects = async () => {
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-CA").format(date);
  const sqlQuery = `
    SELECT
      organization_name AS "organization",
      projects.title AS "projectTitle",
      projects.description AS "projectDescription",
      project_location AS "projectLocation",
      project_date AS "projectDate"
    FROM projects
      INNER JOIN organizations
        ON projects.organization_id = organizations.organization_id
    ORDER BY organizations.organization_name DESC;`;
  const result = await db.query(sqlQuery);
  return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
  const sqlQuery = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      project_location,
      project_date
    FROM projects
    WHERE organization_id = $1
    ;
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
  return result.rows.length > 0 ? result.rows : null; // Return the first row of the result set or null if no rows are found.
};

// Export getAllProjects and getProjectsByOrganizationId functions for use in other parts of the application, such as in server.js file.
export { getAllProjects, getProjectsByOrganizationId };
