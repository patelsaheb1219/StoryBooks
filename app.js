const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const keys = require("./config/keys");

//Load User Model
require("./models/User");

//Passport Config
require("./config/passport")(passport);

//Load routes
const auth = require("./routes/auth");
const index = require("./routes/index");

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose connect
mongoose
  .connect(
    keys.mongoURI,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

const app = express();

// Handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Set global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Use routes
app.use("/", index);
app.use("/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
