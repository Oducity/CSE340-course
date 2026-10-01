// Import the needed modules
import bcrypt from "bcrypt";
import { createUser, authenticateUser } from "../models/users.js";
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
    const userId = await createUser(
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
  // Validate the user input using express-validator
  //const results = validationResult(req);
  //if (!results.isEmpty()) {
  //  // If validation failed then through errors
  //  results.array().forEach((error) => {
  //    req.flash("error", error.msg);
  //  });
  //  // If validation failed, redirect back to the registration form with the errors
  //  return res.redirect(400).render("login", { errors });
  //}
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
    res.redirect("/");
  } catch (error) {
    console.error("Error authenticating user", error);
    req.flash("error", "Error authenticating user. Please try again later.");
    res.redirect("/login");
  }
};

// This function logs out the user by destroying the session and redirecting to the home page
const processLogout = (req, res) => {
  if (req.session.user) {
    delete req.session.user;
  }

  req.flash("success", "Logout successful!");
  res.redirect("/login");
};

export {
  showUserRegistrationForm,
  processUserRegistrationForm,
  showLoginForm,
  processLogout,
  processLoginForm,
};
