////////////////////////// Setup - Import deps and create app object////////////////////////
const dotenv = require("dotenv");
dotenv.config()
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");


mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

//////////////////////// Declare Middleware//////////////////////
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride("_method"));
app.use(morgan('dev'));




///////////////////////// Declare Routes and Routers ///////////////////////
// INDUCES - Index, New, Delete, Update, Create, Edit, Show

app.get("/", async (req,res) => {
    res.render("index.ejs");
});

app.get("/plants", async (req,res) => {
    res.render("plants.ejs")
})

app.get("/plants/new", async (req,res) => {
    res.render("new.ejs")
})



///////////////////////////// Server Listener///////////////////////////
app.listen(4000, () => {
    console.log("listening on port 4000")
});
