import type { Express } from 'express';
import type { Model } from 'mongoose';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';

function addCollectionRoute<DocumentType>(app: Express, path: string, model: Model<DocumentType>) {
  app.get([path, `${path}/`], async (_request, response, next) => {
    if (mongoose.connection.readyState !== 1) {
      response.status(503).json({ error: 'Database unavailable' });
      return;
    }

    try {
      response.json(await model.find().lean().exec());
    } catch (error) {
      next(error);
    }
  });
}

export function registerCollectionRoutes(app: Express) {
  addCollectionRoute(app, '/api/users', User);
  addCollectionRoute(app, '/api/teams', Team);
  addCollectionRoute(app, '/api/activities', Activity);
  addCollectionRoute(app, '/api/leaderboard', LeaderboardEntry);
  addCollectionRoute(app, '/api/workouts', Workout);
}