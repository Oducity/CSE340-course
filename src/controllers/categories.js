// This is the category page
import {
  getAllCategories,
  getCategoryDetailsById,
} from "../models/categories.js"; // import getAllCategories from categories.js to get all categories from the database
import { getProjectsDetailsByCategoryId } from "../models/projects.js";

const showCategoryPage = async (req, res) => {
  const categories = await getAllCategories(); // Fetch all categories from the database
  const title = "Service Categories";
  res.render("categories", { title, categories }); // Render the "category" view and pass the title and categories data to the template
};

const showCategoryDetailsPage = async (req, res) => {
  const categoryId = req.params.id;
  const categoryDetail = await getCategoryDetailsById(categoryId);
  const categoryProjects = await getProjectsDetailsByCategoryId(categoryId);
  const title = "Category Details";
  res.render("category", { title, categoryDetail, categoryProjects });
};

// showCategoryPage exported.
export { showCategoryPage, showCategoryDetailsPage };
