// initializing all variables 
const express = require("express");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const notesData = require("./db/db.json");
const path = require("path");
// const res = require("express/lib/response");
const { randomUUID } = require('crypto');
// console.log(randomUUID());

const app = express();
app.use(express.static("public"));
// Sets up the Express app to handle data parsing
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// html route for everything
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// html route for `notes`
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// API GET route
app.get("/api/notes", (req, res) => {
  console.log(notesData);
  res.json(notesData);
});

// API POST route
app.post("/api/notes", (req, res) => {
    notesData.push({ id: randomUUID(), ...req.body});
    console.log({ id: randomUUID(), ...req.body});
    fs.writeFileSync("./db/db.json", JSON.stringify(notesData, null, 2));
    res.json(notesData);
})

// API DELETE route
app.delete("/api/notes/:id", (req, res) => {
    console.log("Req params", req.params.id) 
        const dbIndex = notesData.findIndex(({ id }) => id === req.params.id);
        console.log(dbIndex);
        notesData.splice(dbIndex, 1);
        fs.writeFileSync("./db/db.json", JSON.stringify(notesData, null,2));
        res.json(notesData);
});

// start server and PORT is set on variable
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}!`);
});
