//Create a basic express server
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const DB = process.env.DB_URL;

//Implement mongoose
mongoose
  .connect(DB)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log("Could not connect to MongoDB", err));

app.use(express.urlencoded());
app.use(express.json());

// Use route in folder routes
const userRoute = require("./routes/userRoute");
userRoute(app);

//Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
