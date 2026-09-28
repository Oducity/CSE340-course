// This is the category page
import { validationResult } from "express-validator";
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

// This controller show the new-categoryForm view
const showAddNewCategoryForm = (req, res) => {
  const title = "Add New Category";
  res.render("new-categoryForm", { title });
};

// This controller processes the addNewCategory model function
const processAddNewCategoryForm = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    // If validation failed then through errors
    result.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    // Redirect back to the new organization form.
    return res.redirect("/new-categoryForm");
  }
  try {
    const { category_name } = req.body;
    const category_id = await addNewCategory(category_name);
    req.flash("Success", "Category created successfully");
    res.redirect(`/category/${category_id}`);
  } catch (error) {
    req.flash("Error creating category");
    res.redirect("/new-categoryForm");
  }
};

// showCategoryPage exported.
export {
  showCategoryPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showAddNewCategoryForm,
  processAddNewCategoryForm,
};
