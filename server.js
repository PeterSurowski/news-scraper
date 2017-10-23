// Declare dependencies:
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Declare scraping tools:
var axios = require("axios");
var cheerio = require("cheerio");

// Set up the Express app:
//var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models:
var db = require("./models");
var PORT = 3000;

// Initialize Express
var app = express();
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Get Handlebars running:
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory
app.use(express.static("public"));
// Use morgan logger for logging requests
app.use(logger("dev"));

// Require routes
require("./routes/api-routes.js")(app);
//require("./routes/html-routes.js")(app);

// Set mongoose to leverage built in JavaScript ES6 Promises:
mongoose.Promise = Promise;
// Connect to the Mongo DB:
mongoose.connect("mongodb://localhost/week18Populater", {
  useMongoClient: true
});

  /* STOLEN FROM HANDLEBARS WISH SERVER.JS
    connection.query("SELECT * FROM wishes;", function(err, data) {
      if (err) {
        throw err;
      }
      res.render("index", { wishes: data });
    });
  });
  */

// Start the server:
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
})