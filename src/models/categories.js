import db from "./db.js";

// This function get all categories data from the database.
const getAllCategories = async () => {
  const sqlQuery = `
    SELECT
      category_id,
      category_name,
      category_description,
      category_tag
      created_at
    FROM category;`;
  const { rows } = await db.query(sqlQuery);
  return rows;
};

// This function get the category id
const getCategoryDetailsById = async (categoryId) => {
  const sqlQuery = `
    SELECT
      category_id,
      category_name,
      category_description,
      category_tag
    FROM category
    WHERE category_id = $1;
  `;
  const idOfCategory = [categoryId];
  const result = await db.query(sqlQuery, idOfCategory);
  return result.rows.length > 0 ? result.rows[0] : [];
};

// This function assigns categories to a project
const assignCategoryToProject = async (projectId, categoryId) => {
  const sqlQuery = `
    INSERT INTO projects_category (project_id, category_id)
    VALUES ( $1, $2 )
    RETURNING project_id, category_id;
  `;

  await db.query(sqlQuery, [projectId, categoryId]);
};

// This function update categories to a project
const updateCategoryAssignments = async (projectId, categoryIds) => {
  const sqlQuery = `
      DELETE FROM projects_category
      WHERE project_id = $1;
    `;

  await db.query(sqlQuery, [projectId]);

  for (const categoryId of categoryIds) {
    await assignCategoryToProject(projectId, categoryId);
  }
};

// This model adds a category the category table
const addNewCategory = async (category_name, category_description) => {
  const sqlQuery = `
  INSERT INTO category(category_name, category_description)
  VALUES( $1, $2 )
  RETURNING category_id;
  `;

  const result = await db.query(sqlQuery, [
    category_name,
    category_description,
  ]);
  return result.rows[0];
};

// This model function update the categories table
const updateCategory = async (
  category_name,
  category_description,
  category_id,
) => {
  const sqlQuery = `
   UPDATE category
   SET category_name = $1, category_description = $2
   WHERE category_id = $3
   RETURNING category_id;
  `;
  return (result.rows = await db.query(sqlQuery, [
    category_name,
    category_description,
    category_id,
  ]));
};
export {
  getAllCategories,
  getCategoryDetailsById,
  assignCategoryToProject,
  updateCategoryAssignments,
  addNewCategory,
  updateCategory,
};
