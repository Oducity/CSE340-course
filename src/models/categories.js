import db from "./db.js";

// This function get all categories data from the database.
const getAllCategories = async () => {
  const sqlQuery = `SELECT category_name, category_description, created_at
                FROM category;`;
  const { rows } = await db.query(sqlQuery);
  return rows;
};

// This function get the category id
const getCategoryDetailsById = (categoryId) => {
  const sqlQuery = `
    SELECT
      category_id,
      category_name
    FROM category
    WHERE category_id = $1;
  `;
  const idOfCategory = [categoryId];
  const result = db.query(sqlQuery, idOfCategory);
  return result.rows > 0 ? result.rows[0] : null;
};
export { getAllCategories, getCategoryDetailsById };
