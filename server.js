const express = require("express");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const notesData = require("./db/db.json");
const path = require("path");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// GET call for `notes` HTML
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  console.log(notesData);
  res.json(notesData);
});

app.post("/api/notes", (req, res) => {
    notesData.push(req.body);
    console.log(notesData);
    fs.writeFileSync("./db/db.json", JSON.stringify(notesData, null, 2));
    res.json(notesData);
})

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}!`);
});
