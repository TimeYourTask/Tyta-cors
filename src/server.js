require('dotenv').config();

// Create a basic express server
const mongoose = require('mongoose');
const app = require('./app');
const PORT = process.env.SERVER_PORT || 3000;

// Implement mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log('Could not connect to MongoDB', err));
