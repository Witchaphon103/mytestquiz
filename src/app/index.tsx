import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';
import transactionRoutes from './routes/transactions';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', transactionRoutes);

mongoose.connect('mongodb://localhost:27017/expense_tracker', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
