// Create a basic express server

const express = require('express');
const mongoose = require('mongoose');

// Use route in folder routes
const userRoute = require('./routes/userRoute');
const teamRoute = require('./routes/teamRoute');
const projectRoute = require('./routes/projectRoute');
const taskRoute = require('./routes/taskRoute');

const app = express();
const PORT = process.env.SERVER_PORT;
const DB = process.env.DB_URL;

// Implement mongoose
mongoose
  .connect(DB)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log('Could not connect to MongoDB', err));

app.use(express.urlencoded());
app.use(express.json());

userRoute(app);
teamRoute(app);
projectRoute(app);
taskRoute(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
