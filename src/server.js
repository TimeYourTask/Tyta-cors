const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

// Use route in folder routes
const userRoute = require('./routes/userRoute');
const teamRoute = require('./routes/teamRoute');
const projectRoute = require('./routes/projectRoute');
const taskRoute = require('./routes/taskRoute');
const resetPasswordRoute = require('./routes/resetPasswordRoute');

const app = express();
const PORT = process.env.SERVER_PORT;

// Implement mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.use(express.urlencoded());
    app.use(express.json());

    userRoute(app);
    resetPasswordRoute(app);
    teamRoute(app);
    projectRoute(app);
    taskRoute(app);

    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log('Could not connect to MongoDB', err));
