const mongoose = require("mongoose");
async function connectMongoose(url){
    mongoose.connect(url);
};
module.exports= {
    connectMongoose,
}