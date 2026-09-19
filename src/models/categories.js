import db from "./db.js";

// This function get all categories data from the database.
const getAllCategories = async () => {
  const sqlQuery = `SELECT category_name, category_description, created_at
                FROM category;`;
  const { rows } = await db.query(sqlQuery);
  return rows;
};

// Using the id object, this function get a single category data from the database
const getCategoryRelatedProjects = async (categoryId) => {
  const sqlQuery = `
    SELECT
      category_name,
      projects.project_id,
      projects.project_name
    FROM category
      INNER JOIN projects_category 
        ON projects_category.category_id = category.category_id
      INNER JOIN projects
        ON projects.project_id = projects_category.project_id
    WHERE category_id = $1
    ORDER BY projects.project_date ASC;
  `;

  const queryParams = [categoryId]; // Get the category id from the input.
  const result = db.query(sqlQuery, queryParams); // Query the database allowing the database to compare for the categoryId on its own for safety.
  return result.rows > 0 ? result.rows[0] : null; // Check and return the result row if the rows found is greater than 0.
};
export { getAllCategories, getCategoryRelatedProjects };
