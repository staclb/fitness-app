// import supertest from 'supertest';
// import app from '../../../server/server';
// import workoutController from '../../../server/controllers/workoutController';
// import { query } from '../../../server/config/pgSetup';

// jest.mock('../../../server/config/pgSetup', () => ({
//   query: jest.fn(),
// }));

// beforeEach(() => {
//   query.mockClear();
// });
// const postData = { name: as, weight: as, reps: as, unixtime: as };
// jest.mock('../../../server/config/pgSetup');

describe('postWorkout Controller', () => {
  it('should insert a workout and set if none exists', async () => {});
  it('should insert a set if workout exists', async () => {});
  it('handles database query failures', async () => {});
  it('handles invalid input data', async () => {});
});
