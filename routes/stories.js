const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Story = mongoose.model("stories");
const User = mongoose.model("users");
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

//Process add Stories
router.post("/", (req, res) => {
  let allowComments;

  if ((req.body, allowComments)) {
    allowComments = true;
  } else {
    allowComments = false;
  }

  const newStory = {
    title: req.body.title,
    status: req.body.status,
    body: req.body.body,
    allowComments: allowComments,
    user: req.user.id
  };

  //Create story
  new Story(newStory).save().then(story => {
    res.redirect(`/stories/show/${story.id}`);
  });
});

module.exports = router;
