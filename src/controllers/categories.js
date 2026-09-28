// This is the category page
import {
  getAllCategories,
  getCategoryDetailsById,
  updateCategoryAssignments,
  addNewCategory,
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
  const projectDetails = await getProjectDetails(projectId);
  const allCategories = await getAllCategories();
  const assignedCategories = await getAllCategoryTagsByProjectId(projectId);

  const title = "Assign Categories to Project";
  res.render("assign-categories", {
    title,
    projectDetails,
    allCategories,
    assignedCategories,
  });
};

// This controller function processes the category form assignment.
const processAssignCategoriesForm = async (req, res) => {
  try {
    const projectId = req.params.id;
    const categoryIds = [].concat(req.body.categoryId); // Array of category IDs.
    await updateCategoryAssignments(projectId, categoryIds);

    req.flash("Success", "Project assigned to categories successfully");
    res.redirect(`/project/${req.params.id}`);
  } catch (error) {
    console.error(`Error assigning project to categories: ${error}`);
    req.flash("Error assigning project to categories!");
    res.redirect("assign-categories");
  }
};

const showAddNewCategoryForm = (req, res) => {
  const title = "Add New Category";
  res.render("new-categoryForm", { title });
};

// showCategoryPage exported.
export {
  showCategoryPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showAddNewCategoryForm,
};
