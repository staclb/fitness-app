import supertest from 'supertest';
import app from '../../../server/server';
import * as db from '../../../server/config/pgSetup';

jest.mock('../../../server/config/pgSetup', () => ({
  query: jest.fn(),
}));

jest.mock('../../../server/controllers/authController', () => ({
  verifyToken: (req, res, next) => {
    req.user = { id: 'mockUserId' }; // Mock user payload
    next();
  },
}));

describe('POST /post', () => {
  it('should post a workout when provided a valid token and exercise data', async () => {
    // const token =
    const mockQuery = db.query as jest.Mock;
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
});
