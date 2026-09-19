// This is the category page
import {
  getAllCategories,
  getCategoryRelatedProjects,
} from "../models/categories.js"; // import getAllCategories from categories.js to get all categories from the database

const showCategoryPage = async (req, res) => {
  const categories = await getAllCategories(); // Fetch all categories from the database
  const title = "Service Categories";
  res.render("categories", { title, categories }); // Render the "category" view and pass the title and categories data to the template
};

const showCategoryDetailsPage = async () => {
  const data = await getCategoryRelatedProjects();
  const title = "Category Related Projects";
  
};

// showCategoryPage exported.
export { showCategoryPage };
