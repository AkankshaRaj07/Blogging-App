const express = require('express');
const {handleCreateBlog, handleDeleteBlog} = require('../controllers/create');

const router = express.Router();

router.get("/", (req, res) => {
  return res.render("create");
});

router.post("/", handleCreateBlog);
router.post("/delete/:id", handleDeleteBlog);

module.exports = router;