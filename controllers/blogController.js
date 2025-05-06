// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
const Blog = require("../models/blog")

const blog_index = (_, res) => { 
    Blog.find().sort({ createdAt: -1 })
    .then(blogs => {
      res.render("blogs/index", {
        title: "All Blogs",
        blogs
      });
    })
    .catch((e) => console.log(e));
}

const blog_details = (req, res) => { 
    const id = req.params.id;
    Blog.findById(id)
    .then(blog => { 
      res.render('blogs/details', {
        title: "Blog Details",
        blog
      })
    })
    .catch(e => {
        console.log(e)
        res.status(404).render('404', { 
            title: "Blog Not Found"
        })
    })
}

const blog_create_get = (_, res) => {
    res.render("blogs/create", {
      title: "Create a new blog"
    });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
    .then((data) => { 
      res.redirect("/blogs")
    })
    .catch(e => { 
      console.log(e);
    })
}

const blog_delete = (req, res) => { 
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
    .then(() => { 
      console.log("item deleted");
      res.json({
        redirect: "/blogs"
      })
    })
    .catch(e => console.log(e))
}

module.exports = { 
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}