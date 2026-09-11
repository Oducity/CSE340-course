import db from "./db"; // import the database connection from db.js to interact with the database

// Define an asynchronous function getAllProjects to fetch all projects from the database along with their associated organization names.
// The function constructs a SQL query that selects the organization name, project title, description, location, and date from the projects table,
// joining it with the organizations table based on the organization_id. It then executes the query using the db.query method and returns the resulting rows.
const getAllProjects = async () => {
  const sqlQuery = `SELECT organizations.organization_name, projects.title, projects.description, projects.project_location, projects.project_date
                    FROM projects
                        INNER JOIN organizations
                            ON projects.organization_id = organizations.organization_id
                    ORDER BY organizations.organization_name DESC;`;
  const result = await db.query(sqlQuery);
  return result.rows;
};

// Export the getAllProjects function so it can be imported and used in other parts of the application, such as in server.js to fetch and display project data.
export { getAllProjects };
