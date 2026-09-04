import express from "express";
import { fileURLToPath } from "url"; // import fileURLToPath from "url" to get the current file path
import path from "path"; // import path from "path" to get the current directory path

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

// Route handlers for different paths.
// Each route sends a specific HTML file as a response.
app.get("/", (req, res) => {
  const title = "Home";
  res.render("home", { title });
});

app.get("/organizations", (req, res) => {
  const title = "Our Organizations Partners";
  res.render("organizations", { title });
});

app.get("/projects", (req, res) => {
  const title = "Service Projects";
  res.render("projects", { title });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});
