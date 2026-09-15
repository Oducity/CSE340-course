import express from "express";
import { fileURLToPath } from "url"; // import fileURLToPath from "url" to get the current file path
import path from "path"; // import path from "path" to get the current directory path
import { testConnection } from "./src/models/db.js"; // import testConnection from db.js to test the database connection
import { getAllOrganizations } from "./src/models/organizations.js"; // import getAllOrganizations from organizations.js to get all organizations from the database
import { getAllProjects } from "./src/models/projects.js"; // import getAllProjects from projects.js to get all projects from the database
import { getAllCategories } from "./src/models/categories.js"; // import getAllCategories from categories.js to get all categories from the database

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || "development";
/*
In the code bellow, import.meta.url gives the URL of the current module, 
fileURLToPath() converts that URL to a file system path,
path.dirname() extracts just the directory portion. This recreates
the same functionality that CommonJS provided automatically.
*/

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Define the environment and port

const app = express();

/*
Configure the Express middleware (i.e app) to serve static files from the "public" directory.
This means that any files in the "public" directory can be accessed directly via their URL.
For example, if there's a file "public/css/main.css", it can be accessed at "http://localhost:3000/css/main.css".
*/
app.use(express.static(path.join(__dirname, "public")));

// Set the view engine to EJS for rendering dynamic content in HTML files.
app.set("view engine", "ejs");

// Set the directory for view templates to "src/views".
app.set("views", path.join(__dirname, "src/views"));

// Set a middleware that log the development mode
app.use((req, res, next) => {
  if (NODE_ENV === "development") {
    console.log(`${req.method} ${req.url}`);
  }
  next();
});

// This middleware set the NODE_ENV variable in as a global variable in the
// res.locals to be available to all .ejs files throughout the programme.
app.use((req, res, next) => {
  res.locals.NODE_ENV = NODE_ENV;
  next();
});
// Route handlers for different paths.
// Each route sends a specific HTML file as a response.
app.get("/", async (req, res) => {
  const title = "Home";
  res.render("home", { title });
});

app.get("/organizations", async (req, res) => {
  const organizations = await getAllOrganizations(); // Fetch all organizations from the database
  const title = "Our Organizations Partners";
  res.render("organizations", { title, organizations }); // Render the "organizations" view and pass the title and organizations data to the template
});

app.get("/projects", async (req, res) => {
  const projects = await getAllProjects(); // Fetch all projects from the database
  const title = "Service Projects";
  res.render("projects", { title, projects }); // Render the "projects" view and pass the title and projects data to the template
});

app.get("/category", async (req, res) => {
  const categories = await getAllCategories(); // Fetch all categories from the database
  const title = "Service Categories";
  res.render("categories", { title, categories }); // Render the "category" view and pass the title and categories data to the template
});

// 404 - page not found error page handler for all routes.
app.use((req, res, next) => {
  const err = new Error("Page Not Found");
  err.status = 404;
  next();
});

// Global error handler
app.use((err, req, res, next) => {
  // Log error for debugging
  console.log("Error occurred", err.message);
  console.log("Stack trace", err.Stack);

  // Determine the status code and template
  const status = err.status || 500;
  const template = status === 404 ? "404" : "500";

  // Prepare data for the template
  const context = {
    title: status === 404 ? "Page Not Found" : "Server Error",
    error: err.message,
    stack: err.stack,
  };

  // Render the appropriate error template
  res.status(status).render(`error/${template}`, context);
});

app.listen(PORT, async () => {
  try {
    await testConnection(); // Test the database connection when the server starts
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
