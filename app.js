const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config()
mongoose.connect("mongodb://localhost/contactDance", {useNewUrlParser: true});
const port = process.env.PORT || 80;

//Define mongoose schema
var contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,
});

var contactSchema = mongoose.model("Contact", contactSchema);

// Express Specific Stuff
app.use("/static", express.static("static"));
app.use(express.urlencoded());

//Pug Specific Stuff
app.set("view engine", "pug"); //set the templet enging as pug
app.set("views", path.join(__dirname, "views"));

//Endpoints
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
  var myData = new contactSchema(req.body);
  myData
    .save()
    .then(() => {
      res.send("This item has been saved to the database");
    })
    .catch(() => {
      res.status(400).send("Item was not saved to the  database");
    });
  // res.status(200).render       ('contact.pug');
});

//Start the server
app.listen(port, () => {
  console.log(`The aplication started sucessfully on port ${port}`);
});
