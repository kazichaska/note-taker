const express = require("express");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const notesData = require("./db/db.json");
const path = require("path");
const uuid = require('uuid');
const res = require("express/lib/response");


const app = express();
app.use(express.static("public"));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

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

app.delete("/api/notes/:id", (req, res) => {
    console.log("Req params", req.params.id) 
        const dbIndex = notesData.findIndex(({ id }) => id === req.params.id);
        if (dbIndex >= 0) {
            notesData.splice(dbIndex, 1);
        }
});

// app.delete('/api/notes/:id', (req, res) => {
//     res.send(`${req.method} Delete request to db.json`);
// });

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}!`);
});
