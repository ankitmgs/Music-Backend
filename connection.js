const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// const DB = process.env.DATABASE;
// const DB = "mongodb+srv://Rehnuma11:1212@cluster0.mkx69tw.mongodb.net/Music_App?retryWrites=true&w=majority";
const DB = "mongodb+srv://ankitmgs:987654321@cluster0.6o3q9.mongodb.net/Major-Project-Music?retryWrites=true&w=majority";


mongoose
  .connect(DB, {})
  .then(() => {
    console.log(`Database Connected Successfully !!`);
  })
  .catch((err) => {
    console.log(`no connection with DB`);
    console.log(err);
  });

module.exports = mongoose;
