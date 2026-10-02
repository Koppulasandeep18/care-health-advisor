import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import leadsRouter from '../routes/leads.js';

const app = express();
const PORT = Number(process.env.PORT || 5000);

const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(helmet());
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST'],
}));
app.use(express.json({ limit: '20kb' }));

const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many enquiries from this network. Please try again later.' },
});

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'care-health-advisor-api',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use('/api/leads', leadLimiter, leadsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error.' });
});

async function start() {
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is missing. Copy server/.env.example to server/.env and add your MongoDB URI.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Care Advisor API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

start();
