const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const blogRoutes = require("./routes/blogRoutes")

dotenv.config();

const app = express();
const mongoDbUser = process.env.MONGO_DB_USER;
const mongoDbPassword = process.env.MONGO_DB_PASSWORD;

const DB_URI = `mongodb+srv://${mongoDbUser}:${mongoDbPassword}@cluster0.ronxkun.mongodb.net/nodejs_blog?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(DB_URI)
  .then(() => {
    app.listen(3000);
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));
app.use(express.static("public"));

app.get("/", (_, res) => {
  res.redirect("/blogs");
});

app.get("/about", (_, res) => {
  res.render("about", {
    title: "About"
  });
});

app.use("/blogs", blogRoutes)

app.use((_, res) => {
  res.status(404).render("404.ejs", {
    title: "404"
  });
});
