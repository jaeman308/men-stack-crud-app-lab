////////////////////////// Setup - Import deps and create app object////////////////////////
require("dotenv").config()

const express = require("express");
const Plant = require("./models/plant.js")
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

//////////////////////// Declare Middleware//////////////////////
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")));



///////////////////////// Declare Routes and Routers ///////////////////////
// INDUCES - Index, New, Delete, Update, Create, Edit, Show

app.get("/", async (req,res) => {
    res.render("index.ejs");
});

app.get("/plants", async (req,res) => {
    const allPlants = await Plant.find();
    // console.log(allPlants);
    res.render("plants/index.ejs", {plants: allPlants});
});

app.get("/plants/new", async (req,res) => {
    res.render("plants/new.ejs");
});


app.get("/plants/:plantId/edit", async (req, res) => {
    const foundPlant = await Plant.findById(req.params.plantId);
    // console.log(foundPlant);
    res.render("plants/edit.ejs", {plant: foundPlant, });
});

app.put("/plants/:plantId", async (req, res)=> {
    if (req.body.indoor === 'on'){
        req.body.indoor = true
    }else {
        req.body.indoor = false
    }
    await Plant.findByIdAndUpdate(req.params.plantId, req.body);

    res.redirect(`/plants/${req.params.plantId}`);
});

app.get("/plants/:plantId", async (req, res) => {
  const foundPlant = await Plant.findById(req.params.plantId);
  res.render("plants/show.ejs", {plant: foundPlant});
});

app.delete("/plants/:plantId", async (req,res)=> {
    await Plant.findByIdAndDelete(req.params.plantId);
    res.redirect("/plants");
});

app.post("/plants", async (req,res) => {
    if (req.body.indoor === 'on'){
        req.body.indoor = true
    }else {
        req.body.indoor = false
    }
     await Plant.create(req.body);
    res.redirect("/plants")
});

///////////////////////////// Server Listener///////////////////////////
app.listen(4000, () => {
    console.log("listening on port 4000")
});
