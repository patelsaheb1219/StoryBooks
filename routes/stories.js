const express = require("express");
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

//Index route for stories
router.get("/", (req, res) => {
  res.render("stories/index");
});

//Add route for story
router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("stories/add");
});

//Edit route for story
router.get("/edit", ensureAuthenticated, (req, res) => {
  res.render("stories/edit");
});

//Show route for particular story
router.get("/show", (req, res) => {
  res.render("stories/show");
});

module.exports = router;
