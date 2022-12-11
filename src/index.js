const express = require("express");
// const collection = require("../models/model");
const studentArray = require("./InitialData");
const app = express();
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const port = 8080;
app.use(express.urlencoded());
// mongoose.connect("mongodb://localhost/studentDB");
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //
// your code goes heres
let id = 8;
app.get("/api/student", async (req, res) => {
  try {
    res.json({
      Status: "Success",
      result: studentArray,
    });
  } catch (e) {
    res.status(404).json({
      Status: "Failed",
      message: e.message,
    });
  }
});
app.get("/api/student/:id", async (req, res) => {
  //5
  const user = studentArray.find((elm) => {
    return elm.id == req.params.id; //5==5
  });
  try {
    res.json({
      Status: "Success",
      result: user,
    });
  } catch (e) {
    res.status(404).json({
      Status: "Failed",
      message: e.message,
    });
  }
});
app.post("/api/student", async (req, res) => {
  let user;
  if (req.body.name && req.body.currentClass && req.body.division) {
    user = studentArray.push({ id, ...req.body }); // [{
    //   id:8,
    // "name":"Amit",
    //   "currentClass":9,
    //   "division":"A"
    //   }]
    id++;
  } else {
    res.status(404).json({
      Status: "Failed",
      message: "All fields (name,currentClass,Division) are mandetory",
    });
  }
  try {
    res.json({
      Status: "Added Success",
      result: user,
    });
    id++;
  } catch (e) {
    res.status(404).json({
      Status: "Failed",
      message: e.message,
    });
  }
});
app.put("/api/student/:id", (req, res) => {
  let orgTarget = studentArray.find((elm) => {
    return elm.id == req.params.id;
  });
  let updatedTarget = req.body;
  let indx = studentArray.findIndex((elm) => {
    return elm.id == req.params.id;
  });
  if (
    (req.body.name || req.body.currentClass || req.body.division) &&
    req.params.id
  ) {
    studentArray[indx] = { ...orgTarget, ...updatedTarget };
  }
  try {
    res.json({ Status: "Updated Success", result: studentArray[indx] });
  } catch (e) {
    res.status(404).json({
      Status: "Failed",
      message: e.message,
    });
  }
});
app.delete("/api/student/:id", (req, res) => {
  let indx = studentArray.findIndex((elm) => {
    return elm.id == req.params.id;
  });
  let deletedUser;
  if (indx >= 0) {
    deletedUser = studentArray.splice(indx, 1);
  } else {
    res.json({ Status: "Failed", message: "Wrong Id Entered" });
  }
  try {
    res.json({
      Status: "Following Data Has been Deleted",
      result: deletedUser,
    });
  } catch (e) {
    res.json({ Status: "Failed", message: e.message });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
