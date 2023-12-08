import supertest from 'supertest';
import type { Request, Response, NextFunction } from 'express';
import app from '../../../server/server';
import * as db from '../../../server/config/pgSetup';

jest.mock('../../../server/config/pgSetup', () => ({
  query: jest.fn(),
}));

jest.mock('../../../server/controllers/authController', () => ({
  verifyToken: (req: Request, res: Response, next: NextFunction) => {
    // to mock decoded token for userId
    res.locals.decodedToken = { userId: 'mockUserId' };
    next();
  },
}));

describe('POST /post', () => {
  it('should post a workout when provided a valid token and exercise data', async () => {
    // typing for Jest mock function
    const mockQuery = db.query as jest.Mock;
    // creating logic for mock function
    mockQuery.mockImplementation((query, values) => {
      if (query.includes('SELECT exercise_id')) {
        return Promise.resolve({ rows: [{ exercise_id: 1 }] });
      }
      if (query.includes('INSERT into exercises')) {
        return Promise.resolve({ rows: [{ exercise_id: 2 }] });
      }
      if (query.includes('INSERT into sets')) {
        return Promise.resolve({ rows: [{ set_id: 3 }] });
      }
    });
    const response = await supertest(app)
      .post('/api/workout/add')
      .set('Authorization', 'Bearer TOKEN')
      .send({
        name: 'Test Workout',
        weight: 50,
        reps: 10,
        unixtime: Date.now(),
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('setId');
  });
  it('should return an error if inserting an exercise fails', async () => {
    const mockQuery = db.query as jest.Mock;
    mockQuery.mockImplementation(() => {
      return Promise.reject(new Error('Database query failed'));
    });
    const response = await supertest(app)
      .post('/api/workout/add')
      .set('Authorization', 'Bearer TOKEN')
      .send({
        name: 'Test Workout',
        weight: 50,
        reps: 10,
        unixtime: Date.now(),
      });
    expect(response.status).not.toBe(200);
    expect(response.body).toHaveProperty(
      'err',
      'Failed to post workout, please verify the provided data.',
    );
  });
  it('should reject requests without a token', async () => {
    // jest.mock('../../../server/controllers/authController', () => ({
    //   verifyToken: async (req, res, next) => {
    //     res.status(400).json({ error: 'No token, authorization denied.' });
    //   },
    // }));
    // const response = await supertest(app).post('/api/workout/add').send({
    //   name: 'Test Workout',
    //   weight: 50,
    //   reps: 10,
    //   unixtime: Date.now(),
    // });
    // expect(response.status).toBe(400);
    // expect(response.body).toHaveProperty(
    //   'error',
    //   'No token, authorization denied.',
    // );
  });
});
