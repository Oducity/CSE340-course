import express from "express";
import session from "express-session";
import { fileURLToPath } from "url"; // import fileURLToPath from "url" to get the current file path
import path from "path"; // import path from "path" to get the current directory path
import { testConnection } from "./src/models/db.js"; // import testConnection from db.js to test the database connection
import router from "./src/routes.js"; // This import the router object containing all route handlers.
import session from "express-session";

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || "development";
const SESSION_SECRET = process.env.SESSION_SECRET;
/*
In the code bellow, import.meta.url gives the URL of the current module, 
fileURLToPath() converts that URL to a file system path,
path.dirname() extracts just the directory portion. This recreates
the same functionality that CommonJS provided automatically.
*/

const PORT = process.env.PORT || 3000; // Define the port.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Define the environment.

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

// Set session middleware --- This middleware must come before all other middleware
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // Session express after 1 hour of inactivity
  }),
);

// Set a middleware that log the development mode
app.use((req, res, next) => {
  if (NODE_ENV === "development") {
    console.log(`${req.method} ${req.url}`);
  }
  next();
});

// This middleware set the NODE_ENV variable as a global variable in the
// res.locals to be available to all .ejs files throughout the programme.
app.use((req, res, next) => {
  res.locals.NODE_ENV = NODE_ENV;
  next();
});

// Allow express to receive and process common POST data.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  app uses the imported router to handel all routes.
app.use(router);

// Catch all routes for 404 errors.
app.use((req, res, next) => {
  const err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  // Log error for debugging
  console.error("Error occurred", err.message);
  console.error("Stack trace", err.stack);

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
  res.status(status).render(`errors/${template}`, context);
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
