//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

// access local module/class
const date = require(__dirname + "/date.js");

// console.log(date);

const app = express();

// When we create const Array, it is still possible to push
// items inside the array. However, assigning a new array to the
// variable throws an error.
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  const day = date.getDate();

  res.render("list",
    {
      listTitle: day,
      newListItems: items
    }
  );
});

app.post("/", function(req, res) {
  // console.log(req.body.newItem);
  const item = req.body.newItem;

  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems})
});

app.get("/about" , function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
