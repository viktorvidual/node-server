const express = require('express');

const app = express();

//register view engie
app.set("view engine", "ejs")
// listen for requests

app.listen(3000)

app.get("/", (req, res) => { 
    const blogs = [
        {title: "Yoshi", snipet: "Come Home Yoshi"},
        {title: "Mario", snipet: "I am going to save princess peach"},
        {title: "Bowser", snipet: "I am going to have the pricess for myself"},
    ];

    res.render("index",  {
        title: "Home",
        blogs
    })
})

app.get("/about", (req, res) => { 
    // res.send("<p>About Page Here</p>")
    res.render("about", { 
        title: "About"
    })
})

app.get("/blogs/create", (req, res) => {
    res.render("create", {
        title: "Create a new blog"
    });
})

app.use((req, res) => { 
    res.status(404).render("404.ejs", {
        title: "404"
    })
})