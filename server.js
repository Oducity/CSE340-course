import express from "express";

const NODE_ENV = "production";
//const PORT = process.env.PORT || 3000;

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, Node.js!");
});
app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});
