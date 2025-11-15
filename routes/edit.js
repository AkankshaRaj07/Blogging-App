// routes/edit.js
const express = require("express");
const { getEditPage, handleUpdateBlog } = require("../controllers/edit");
const router = express.Router();

// GET /edit/:id -> show edit form (pre-filled)
router.get("/edit/:id", getEditPage);

// POST /edit/:id -> update blog
router.post("/edit/:id", handleUpdateBlog);

module.exports = router;
