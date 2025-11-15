const path = require("path");
const express= require("express");
const app= express();
const {connectMongoose} = require("./connection");

const createRoute = require("./routes/create");
const { handleGetHomePage } = require("./controllers/showBlogs");

const editRoute = require("./routes/edit");

const PORT=8000;

connectMongoose('mongodb://127.0.0.1:27017/blog-app').then(() => console.log("MongoDb Connected."));

app.set("view engine" , "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/create", createRoute);
app.use("/", editRoute);

app.get("/", handleGetHomePage);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
