import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './database/database.js';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'https://task-manager-react-5bo0.onrender.com'
}));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Database connection and server start
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.sync({ force: false });
    console.log('Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer().then(() => console.log("Server running") );