const express = require('express');

const app = express();

//register view engie
app.set("view engine", "ejs")
// listen for requests

app.listen(3000)

app.get("/", (req, res) => { 
    // res.send("<p>Home Page Here</p>")
    res.render("index")
})

app.get("/about", (req, res) => { 
    // res.send("<p>About Page Here</p>")
    res.render("about")
})

app.get("/about-us", (req, res) => { 
    res.redirect("/about")
})

app.get("/blogs/create", (req, res) => {
    res.render("create");
})

app.use((req, res) => { 
    res.status(404).render("404.ejs")
})