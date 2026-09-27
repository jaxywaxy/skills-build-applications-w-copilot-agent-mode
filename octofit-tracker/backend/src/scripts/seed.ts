import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { displayName: 'Maya Chen', email: 'maya.chen@example.com' },
      { displayName: 'Leo Martinez', email: 'leo.martinez@example.com' },
      { displayName: 'Priya Patel', email: 'priya.patel@example.com' },
      { displayName: 'Jordan Brooks', email: 'jordan.brooks@example.com' },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Dawn Pacers',
        memberIds: [users[0]._id, users[1]._id],
        points: 1240,
      },
      {
        name: 'Summit Crew',
        memberIds: [users[2]._id, users[3]._id],
        points: 1085,
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        activityType: 'running',
        durationMinutes: 38,
        distanceKilometers: 6.2,
        completedAt: new Date('2026-09-25T06:30:00Z'),
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        activityType: 'cycling',
        durationMinutes: 52,
        distanceKilometers: 18.4,
        completedAt: new Date('2026-09-25T07:15:00Z'),
      },
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        activityType: 'strength training',
        durationMinutes: 45,
        completedAt: new Date('2026-09-24T17:00:00Z'),
      },
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        activityType: 'hiking',
        durationMinutes: 95,
        distanceKilometers: 7.8,
        completedAt: new Date('2026-09-23T09:00:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id, points: 680, rank: 1, period: 'week-2026-09-21' },
      { userId: users[2]._id, points: 610, rank: 2, period: 'week-2026-09-21' },
      { userId: users[1]._id, points: 560, rank: 3, period: 'week-2026-09-21' },
      { userId: users[3]._id, points: 475, rank: 4, period: 'week-2026-09-21' },
      { teamId: teams[0]._id, points: 1240, rank: 1, period: 'week-2026-09-21' },
      { teamId: teams[1]._id, points: 1085, rank: 2, period: 'week-2026-09-21' },
    ]);

    await Workout.insertMany([
      {
        name: 'Easy Morning Run',
        description: 'A relaxed aerobic run with a steady, conversational pace.',
        activityType: 'running',
        durationMinutes: 30,
        difficulty: 'easy',
      },
      {
        name: 'Tempo Ride',
        description: 'Build cycling endurance with controlled tempo intervals.',
        activityType: 'cycling',
        durationMinutes: 45,
        difficulty: 'moderate',
      },
      {
        name: 'Full Body Strength',
        description: 'A balanced session focused on foundational compound movements.',
        activityType: 'strength training',
        durationMinutes: 40,
        difficulty: 'moderate',
      },
      {
        name: 'Hill Repeats',
        description: 'Short uphill efforts to develop leg strength and running power.',
        activityType: 'running',
        durationMinutes: 35,
        difficulty: 'hard',
      },
    ]);

    console.log('Seeded 4 users, 2 teams, 4 activities, 6 leaderboard entries, and 4 workouts');

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
