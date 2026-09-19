import db from "./db.js"; // import the database connection from db.js to interact with the database

// Define an asynchronous function getAllProjects to fetch all projects from the database along with their associated organization names.
// The function constructs a SQL query that selects the organization name, project title, description, location, and date from the projects table,
// joining it with the organizations table based on the organization_id. It then executes the query using the db.query method and returns the resulting rows.
const getAllProjects = async () => {
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
    WHERE projects.organization_id = organizations.organization_id
    ORDER BY organization_name DESC;`;
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

/**
 This function get next upcoming projects.
 */
const getUpcomingProjects = async (number_of_projects) => {
  const sqlQuery = `
    SELECT
      organization_name AS "organization",
      project_id AS "projectId",
      projects.title AS "projectTitle",
      projects.description AS "projectDescription",
      project_date AS "projectDate",
      project_location AS "projectLocation",
      projects.organization_id AS "oganizationId"
    FROM projects
      INNER JOIN organizations
       ON projects.organization_id = organizations.organization_id
    WHERE project_date >= CURRENT_DATE
    ORDER BY project_date ASC LIMIT $1;
  `;

  const queryParams = [number_of_projects];
  const result = await db.query(sqlQuery, queryParams);

  return result.rows.length > 0 ? result.rows : null;
};

// This function model query the database for the details of a project.
const getProjectDetails = async (projectId) => {
  const sqlQuery = `
    SELECT
      project_id,
      title AS "projectTitle",
      projects.description AS "projectDescription",
      project_date AS "projectDate",
      project_location AS "projectLocation",
      organizations.organization_id AS "organizationId",
      organization_name AS "organizationName"
    FROM projects
      INNER JOIN organizations
        ON projects.organization_id = organizations.organization_id
    WHERE project_id = $1
  ;`;

  const queryParams = [projectId];
  const result = await db.query(sqlQuery, queryParams);

  return result.rows[0];
};

// Using the id object, this function get all category related projects data from the database
const getProjectsDetailsByCategoryId = async (categoryId) => {
  const sqlQuery = `
    SELECT
      category_name,
      projects.project_id AS "projectId",
      projects.title AS "projectTitle",
      category_tag
    FROM category
      INNER JOIN projects_category 
        ON projects_category.category_id = category.category_id
      INNER JOIN projects
        ON projects.project_id = projects_category.project_id
    WHERE projects_category.category_id = $1
    ORDER BY projects.project_date ASC;
  `;

  const queryParams = [categoryId]; // Get the category id from the input.
  const result = await db.query(sqlQuery, queryParams); // Query the database allowing the database to compare for the categoryId on its own for safety.
  return result.rows.length > 0 ? result.rows : null; // Check and return the result row if the rows found is greater than 0.
};

const getAllCategoryTagsByProjectId = async (projectId) => {
  const sqlQuery = `
    SELECT
      projects.project_id AS "projectId",
      category.category_id AS "categoryId",
      category_tag
    FROM category
      INNER JOIN projects_category
        ON projects_category.category_id = category.category_id
      INNER JOIN projects
        ON projects.project_id = projects_category.project_id
    WHERE projects_category.project_id = $1
    ORDER BY category.category_id;
  `;
  const queryParams = [projectId];
  const result = await db.query(sqlQuery, queryParams);
  return result.rows.length > 0 && result.rows.length <= 4 ? result.rows : null;
};

// Export getAllProjects and getProjectsByOrganizationId functions for use in other parts of the application, such as in server.js file.
export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  getProjectsDetailsByCategoryId,
  getAllCategoryTagsByProjectId,
};
