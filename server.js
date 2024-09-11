////////////////////////// Setup - Import deps and create app object////////////////////////
const dotenv = require("dotenv");
dotenv.config()
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const port = process.env.PORT ? process.env.PORT : "3000";

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






///////////////////////////// Server Listener///////////////////////////
app.listen(port, () => {
    console.log('The Express app is ready on port ${port}!')
})