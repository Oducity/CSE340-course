import express from "express";
import { fileURLToPath } from "url"; // import fileURLToPath from "url" to get the current file path
import path from "path"; // import path from "path" to get the current directory path

/*
In the code bellow, import.meta.url gives the URL of the current module, 
fileURLToPath() converts that URL to a file system path,
path.dirname() extracts just the directory portion. This recreates
the same functionality that CommonJS provided automatically.
*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Define the environment and port
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || "development";
//const PORT = process.env.PORT || 3000;

const PORT = process.env.PORT || 3000;

const app = express();

/*
Configure the Express middleware (i.e app) to serve static files from the "public" directory.
This means that any files in the "public" directory can be accessed directly via their URL.
For example, if there's a file "public/css/main.css", it can be accessed at "http://localhost:3000/css/main.css".
*/
app.use(express.static(path.join(__dirname, "public")));

// Route handlers for different paths.
// Each route sends a specific HTML file as a response.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views/home.html"));
});

app.get("/organizations", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views/organizations.html"));
});

app.get("/projects", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views/projects.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});
