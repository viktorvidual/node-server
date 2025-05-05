const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog'); // Remove `.ts` if it's being transpiled to JS
const dotenv = require('dotenv');
const { log } = require('console');

dotenv.config();

const app = express();
const mongoDbUser = process.env.MONGO_DB_USER;
const mongoDbPassword = process.env.MONGO_DB_PASSWORD;

console.log(mongoDbPassword);

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

app.get("/about", (_, res) => {
  res.render("about", {
    title: "About"
  });
});

app.get("/", (_, res) => {
  res.redirect("/blogs");
});

app.get("/blogs", (_, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(blogs => {
      res.render("index", {
        title: "All Blogs",
        blogs
      });
    })
    .catch((e) => console.log(e));
});

app.get("/blogs/create", (_, res) => {
  res.render("create", {
    title: "Create a new blog"
  });
});

app.get("/blogs/:id", (req, res) =>{ 
  const id = req.params.id;
  Blog.findById(id)
  .then(blog => { 
    res.render('details', {
      title: "Blog Details",
      blog
    })
  })
  .catch(e => console.log(e))
})

app.delete("/blogs/:id", (req, res) => { 
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
  .then(result => { 
    console.log("item deleted");
    res.json({
      redirect: "/blogs"
    })
  })
  .catch(e => console.log(e))
})

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body)
  blog.save()
  .then((data) => { 
    res.redirect("/blogs")
  })
  .catch(e => { 
    console.log(e);
  })
})

app.use((_, res) => {
  res.status(404).render("404.ejs", {
    title: "404"
  });
});
