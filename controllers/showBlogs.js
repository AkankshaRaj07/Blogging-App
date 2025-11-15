const Blog = require('../models/create');

async function handleGetHomePage(req, res) {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.render("home", { blogs });
    } catch (err) {
        console.error("Error fetching blogs:", err);
        return res.status(500).render("home", { blogs: [] });
    }
}

module.exports = { handleGetHomePage };
