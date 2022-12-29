const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./docs/swagger');

require('dotenv').config();

// Use route in folder routes
const http = require('http');
const userRoute = require('./routes/userRoute');
const teamRoute = require('./routes/teamRoute');
const projectRoute = require('./routes/projectRoute');
const taskRoute = require('./routes/taskRoute');
const authRoute = require('./routes/authRoute');

const app = express();

const server = http.createServer(app);

const PORT = process.env.PORT || '8080';
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

// Implement mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    // Use cors
    app.use(cors({ origin: '*' }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));

    // Use route
    userRoute(app);
    teamRoute(app);
    projectRoute(app);
    taskRoute(app);
    authRoute(app);

    app.get('/', (req, res) => {
      res.send('Welcome to TimeYourTasks API !');
    });

    // Start server
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log('Could not connect to MongoDB', err));

// Inplement Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
