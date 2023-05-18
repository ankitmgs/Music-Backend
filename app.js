const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./router/userRouter");
const musicRouter = require("./router/musicRouter");
const artistRouter = require("./router/artistRouter");
const adminRouter = require("./router/adminRouter");
const utilRouter = require("./router/utils");

// const dotenv = require("dotenv");
require("./connection");
const dotenv = require("dotenv").config();

const Port = process.env.PORT;

app.use(cors({ origin: ["http://localhost:3000"] }));

//to convert json into understandable for machine
app.use(express.json());

//middleware
//for user

//for music
app.use("/user", userRouter);
app.use("/music", musicRouter);
app.use("/admin", adminRouter);
app.use("/artist", artistRouter);
app.use("/util", utilRouter);

app.use(express.static("./static/uploads"));

app.listen(Port, () => {
  console.log(`Server Started at port no ${Port}`);
});
