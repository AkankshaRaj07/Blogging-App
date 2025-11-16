const mongoose = require("mongoose");
async function connectMongoose(uri){
     await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected");
};
module.exports= {
    connectMongoose,
}