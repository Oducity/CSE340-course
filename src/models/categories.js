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
      category_tag
    FROM category
    WHERE category_id = $1;
  `;
  const idOfCategory = [categoryId];
  const result = await db.query(sqlQuery, idOfCategory);
  return result.rows.length > 0 ? result.rows[0] : null;
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
export {
  getAllCategories,
  getCategoryDetailsById,
  assignCategoryToProject,
  updateCategoryAssignments,
};
