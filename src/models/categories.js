import db from "./db.js";

const getAllCategories = async () => {
  const sqlQuery = `SELECT category_name, category_description, created_at
                FROM category;`;
  const { rows } = await db.query(sqlQuery);
  return rows;
};

export { getAllCategories };
