//Create a basic express server
const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

const port = process.env.SERVER_PORT || 3000;
const db = process.env.DB_URL || "mongodb://localhost:27017/tyta";

//Implement mongoose
mongoose
	.connect(db)
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch((err) => console.log("Could not connect to MongoDB", err));

//Create a basic route
app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use(express.json());

//Start the server
app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
