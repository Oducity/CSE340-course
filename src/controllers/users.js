// Import the needed modules
import bcrypt from "bcrypt";
import { createUser } from "../models/createUser.js";
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
    res.redirect(`/user/${userId}`);
  } catch (error) {
    console.error("Error creating new user", error);
    req.flash("error", "Error creating new user. Please try again later.");
    res.redirect("/register");
  }
};

export { showUserRegistrationForm, processUserRegistrationForm };
