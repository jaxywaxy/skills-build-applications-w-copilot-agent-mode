import express from 'express';
import mongoose from 'mongoose';
import { connectToDatabase } from './config/database.js';
import { registerCollectionRoutes } from './routes.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get(['/api', '/api/'], (_request, response) => {
  response.json({ baseUrl: apiBaseUrl });
});

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

registerCollectionRoutes(app);

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`OctoFit API URL: ${apiBaseUrl}`);
  void connectToDatabase().catch((error: unknown) => {
    console.error('Unable to connect to MongoDB:', error);
  });
});