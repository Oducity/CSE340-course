// This is the category page
import {
  getAllCategories,
  getCategoryDetailsById,
} from "../models/categories.js"; // import getAllCategories from categories.js to get all categories from the database
import {
  getProjectsDetailsByCategoryId,
  getProjectDetails,
  getAllCategoryTagsByProjectId,
} from "../models/projects.js";

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

const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.id;
  const projectDetails = await getProjectDetails();
  const allCategories = await getAllCategories();
  const allCategoriesByProjectId =
    await getAllCategoryTagsByProjectId(projectId);

  const title = "Assign Categories to Projects";
  res.render("assign-categories", {
    title,
    projectDetails,
    allCategories,
    allCategoriesByProjectId,
  });
};

// showCategoryPage exported.
export { showCategoryPage, showCategoryDetailsPage, showAssignCategoriesForm };
