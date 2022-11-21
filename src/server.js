//Create a basic express server
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.SERVER_PORT || 3000;

//Create a basic route
app.get("/", (req, res) => {
	res.send("Hello World!");
});

//Start the server
app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
