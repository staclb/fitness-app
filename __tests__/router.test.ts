// import request from 'supertest';
// import express from 'express';

// const app = express();

// describe('Get workouts by day', () => {
//   it('should return all workouts by day, unixtime', () => {
//     return request(app)
//       .get('/api/workout/getByDay')
//       .expect()
//   });
// });
// import app from '../server/server'
// const request = require('supertest');

// let server: any;
// beforeAll(() => {
//   server = app.listen(3001); // Start server on a different port for tests
// });

// // afterAll(() => {
// //   server.close(); // Close the server after tests
// // });

// afterAll(async () => {
//   await new Promise((resolve, reject) => {
//     // fix any type here
//     server.close((err : any) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve(err);
//     });
//   });
// });

// describe('Workout Routes', () => {
//   describe('POST /api/workout/post', () => {
//     it('responds with status 200 on successful post', async () => {
//       const responce = await request(app)
//         .post('/api/workout/post')
//         .send({
//           "name": "curl",
//           "weight": 25,
//           "reps": 12,
//           "userId": 1,
//           "unixtime": new Date().getTime()
//         })
//         console.log(responce.statusCode)
//       expect(responce.statusCode).toBe(200)
//     })
//   })
// })
