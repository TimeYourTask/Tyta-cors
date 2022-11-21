//Create a basic express server
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// require("dotenv").config();

const PORT = process.env.PORT;
const DB = process.env.DB_URL;

//Implement mongoose
mongoose
  .connect(DB)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log("Could not connect to MongoDB", err));

//Create a basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

//Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
