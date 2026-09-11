import db from "./db";

const getAllProjects = async () => {
  const sqlQuery = `SELECT organizations.organization_name, projects.title, projects.description, projects.project_location, projects.project_date
                    FROM projects
                        INNER JOIN organizations
                            ON projects.organization_id = organizations.organization_id;`;
  const result = await db.query(sqlQuery);
  return result.rows;
};

export { getAllProjects };
