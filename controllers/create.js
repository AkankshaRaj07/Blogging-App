const Blog = require('../models/create');
const mongoose = require("mongoose");

async function handleCreateBlog(req, res) {
    const body = req.body;
    if (!body.title || !body.content) return res.status(400).render("create", { error: "Title and content are required" });

    try {
        await Blog.create({
            title: body.title,
            content: body.content,
        });

        // on success, redirect to homepage (or wherever you want)
        return res.redirect("/");
    } catch (err) {
        console.error("Create blog error:", err);
        return res.status(500).render("create", { error: "Some error occurred" });
    }
}

async function handleDeleteBlog(req,res){
    const {id} = req.params;
    if(!id) {
        return res.status(400).send("Missing blog id");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid blog id");
    }

    try{
        await Blog.findByIdAndDelete(id);
        return res.redirect("/");
    }catch(err){
        console.error("Delete blog error: ", err);
        return res.status(500).send("An error occured while deleting the blog.");
    }
}
module.exports = {
    
    handleCreateBlog,
    handleDeleteBlog,
}