import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import playerRoutes from './routes/players';
import { errorHandler } from './middleware/errorHandler';

// App setup
// Create app instance
const app = express();
const PORT = process.env.PORT || 3000;

// Core middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Basic endpoints (routes)
app.get('/', (req, res) => {
  res.json({ message: 'StatTrack API is running!', status: 'success' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/v1/players', playerRoutes);

// Centralized error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`StatTrack API running on http://localhost:${PORT}`);
});

export default app;