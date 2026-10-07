// Import the needed modules
import bcrypt from "bcrypt";
import {
  createUser,
  authenticateUser,
  getUsersDetails,
  addVolunteerToProject,
  removeVolunteerFromProject,
} from "../models/users.js";
import { validationResult } from "express-validator";

const showUserRegistrationForm = (req, res) => {
  res.render("register", { title: "Register" });
};

const processUserRegistrationForm = async (req, res) => {
  // Destructure the user input from the request body
  const { name, email, password } = req.body;
  // Validate the user input using express-validator
  const results = validationResult(req);
  if (!results.isEmpty()) {
    // If validation failed then through errors
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });
    // If validation failed, redirect back to the registration form with the errors
    return res.redirect(400).render("register", { errors });
  }

  try {
    // Hash the password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    //const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await createUser(
      name,
      email,
      passwordHash,
      2, // Default role ID for a regular user
    );
    req.flash("success", "User registered successfully.");
    res.redirect("/");
  } catch (error) {
    console.error("Error creating new user", error);
    req.flash("error", "Error creating new user. Please try again later.");
    res.redirect("/register");
  }
};

// This function displays the user login form
const showLoginForm = (req, res) => {
  res.render("login", { title: "User Login" });
};

// This function processes the user login form submission
const processLoginForm = async (req, res) => {
  // Destructure the user input from the request body
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(email, password);
    if (!user) {
      req.flash("error", "Invalid email or password.");
      return res.redirect("/login");
    }
    req.session.user = user;
    req.flash("success", "Logged in successfully.");
    if (res.locals.NODE_ENV === "development") {
      console.log("User logged in:", user);
    }
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error authenticating user", error);
    req.flash("error", "Error authenticating user. Please try again later.");
    res.redirect("/login");
  }
};

const requireLogin = (req, res, next) => {
  // If the user is not logged in, redirect them to the login page with an error message
  if (!req.session.user) {
    req.flash("error", "You must be logged in to view this page.");
    return res.redirect("/login");
  }
  next();
};

// This function logs out the user by destroying the session and redirecting to the home page
const processLogout = (req, res) => {
  if (req.session.user) {
    delete req.session.user;
  }

  req.flash("success", "Logout successful!");
  res.redirect("/login");
};

// This function displays the user dashboard page
const showDashboard = (req, res) => {
  const { user_name, user_email } = req.session.user;
  res.render("dashboard", {
    title: "Dashboard",
    email: user_email,
    name: user_name,
  });
};

// This controller function handles the getUserDetails model function
const showAllUsersPage = async (req, res) => {
  const allUsers = await getUsersDetails();
  res.render("users-page", { title: "All Users", allUsers });
};

// This function checks if a user is an admin by checking their role
// and protects the admin routes only. This function is used as middleware in the routes that require admin access.
// this function is a factory middleware that returns a middleware function that checks if the user is an admin. It takes
// the role parameter of the admin as an argument and returns a middleware function that checks if the user is logged
// in and has the admin role. If the user is not logged in or does not have the admin role, it redirects them to
// the home page with an error message.
const requireRole = (role) => {
  return async (req, res, next) => {
    if (!req.session || !req.session.user) {
      req.flash("error", "You must be logged in to view this page.");
      return res.redirect("/login");
    }
    if (req.session.user.role_name !== role) {
      req.flash("error", "You must be an admin to view this page.");
      return res.redirect("/dashboard");
    }
    next(); // This function moves the operation to the next middleware
  };
};

// This function get the userId of the volunteer and the projectId of the project the user want to volunteer for.
const processAddVolunteerToProject = async (req, res) => {
  const projectId = req.params.id;
  const userId = req.session.user.user_id;

  try {
    await addVolunteerToProject(userId, projectId);
    req.flash("success", "Success in volunteering for this project");
    res.redirect(`/project/${projectId}`);
  } catch (error) {
    console.error("Error creating new volunteer", error);
    req.flash("error", "Error adding you to volunteers");
    res.redirect(`/project/${projectId}`);
  }
};

// This function removes volunteer from a project
const processRemoveVolunteerFromProject = async (req, res) => {
  const userId = req.session.user.user_id;
  const projectId = req.params.id;
  try {
    const removed = await removeVolunteerFromProject(userId, projectId);
    if (!removed) {
      req.flash("error", "You are not a volunteer for this project.");
      return res.redirect(`/project/${projectId}`);
    }
    req.flash(
      "success",
      "You have been successfully removed from the project volunteers",
    );

    res.redirect(`/project/${projectId}`);
  } catch (error) {
    console.error("Error removing volunteer from project", error);
    req.flash("error", "Error removing you from project volunteer");
    res.redirect(`/project/${projectId}`);
  }
};

//const getVolunteeredProject = async (req, res) => {}

export {
  showUserRegistrationForm,
  processUserRegistrationForm,
  showLoginForm,
  processLogout,
  processLoginForm,
  requireLogin,
  showDashboard,
  requireRole,
  showAllUsersPage,
  processAddVolunteerToProject,
  processRemoveVolunteerFromProject,
};
