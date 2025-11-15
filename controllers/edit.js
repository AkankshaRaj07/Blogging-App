const Blog = require("../models/create");
const mongoose = require("mongoose");

async function getEditPage(req, res) {
    const { id } = req.params;
    if (!id) return res.status(400).send("Missing id");
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send("Invalid id");
    try {
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).send("Blog not found");

        // render edit view with the blog object
        return res.render("edit", { blog });
    } catch (err) {
        console.error("Get edit page error:", err);
        return res.status(500).send("Server error");
    }
}

async function handleUpdateBlog(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!id) return res.status(400).send("Missing id");
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send("Invalid id");
  if (!title || !content) {
    // Re-render the edit page with the old content and an error message
    try {
      const blog = await Blog.findById(id);
      return res.status(400).render("edit", { blog, error: "Title and content are required" });
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }

  try {
    await Blog.findByIdAndUpdate(id, { title, content }, { new: true, runValidators: true });
    return res.redirect("/"); // render homepage with updated content
  } catch (err) {
    console.error("Update blog error:", err);
    try {
      const blog = await Blog.findById(id);
      return res.status(500).render("edit", { blog, error: "An error occurred while updating" });
    } catch (innerErr) {
      return res.status(500).send("Server error");
    }
  }
}

module.exports = {
  getEditPage,
  handleUpdateBlog,
};