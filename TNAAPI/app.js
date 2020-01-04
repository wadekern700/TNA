const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const guestRoutes = require("./routes/guest");
const userRoutes = require("./routes/user");
const app = express();



mongoose
  .connect(
    "mongodb+srv://wade:" +
    process.env.MONGO_ATLAS_PW +
    "@tna-ys4tn.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/guests", guestRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
