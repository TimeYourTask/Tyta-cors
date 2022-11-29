require('dotenv').config();

// Use route in folder routes
const userRoute = require('./routes/userRoute');
const teamRoute = require('./routes/teamRoute');

const app = express();
const PORT = process.env.SERVER_PORT;
const DB = process.env.DB_URL;

// Implement mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    
    app.use(express.urlencoded());
    app.use(express.json());

    userRoute(app);
    teamRoute(app);

    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log('Could not connect to MongoDB', err));