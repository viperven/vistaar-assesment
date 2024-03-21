const mongoose = require("mongoose");


mongoose
  .connect("mongodb://0.0.0.0/test")
  .then(() => {
    console.log("mongodb connection successful");
  })
  .catch((err) => {
    console.log("error in connection");
  });


  