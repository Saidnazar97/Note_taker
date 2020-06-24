const express = require("express");
const router = express.Router();
const fs = require("fs");
const {
  networkInterfaces
} = require("os");
const {
  notEqual
} = require("assert");

router.get("/api", (req, res) => {
  res.json({
    msg: "This api works."
  });
});

router.get("/api/notes", (req, res) => {
  let data = fs.readFileSync("db.json", "utf8");

  data = JSON.parse(data);
  let dbJsonVal = JSON.stringify(data, null, 2);

  res.json(dbJsonVal);
});

router.post("/api/notes", (req, res) => {
  let data = fs.readFileSync("db.json", "utf8");
  data = JSON.parse(data);
  let newNotes = req.body;
  newNotes.id = data.length + 1 + "";
  console.log(newNotes.id);
  console.log(newNotes);
  data.push(newNotes);
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.json(data);
});

router.delete("/api/notes/:id", (req, res) => {

  let id = req.params.id;

  let data = fs.readFileSync("db.json", "utf8");

  data = JSON.parse(data);

  for (let i = 0; i < data.length; i++) {
    console.log(typeof id);
    console.log(typeof data[i].id);
    if (data[i].id === id) {
      data.splice(i, 1);
    }
  }
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
  res.json(data);
});

module.exports = router;