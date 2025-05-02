const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');

const app = express();

const mongoDbUser = "viktor"
const mongoDbPassword="N9udQ45o2aVCr5O8"

//connect to mongo db
const DB_URI = `mongodb+srv://${mongoDbUser}:${mongoDbPassword}@cluster0.ronxkun.mongodb.net/nodejs_blog?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(DB_URI)
.then((result) =>{
    app.listen(3000)
    console.log("connected to db")})
.catch((er) => console.log(err))


//register view engie
app.set("view engine", "ejs")
// listen for requests


app.use(morgan('dev'))

app.use(express.static("public"))

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