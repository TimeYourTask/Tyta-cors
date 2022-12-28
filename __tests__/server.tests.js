const mongoose = require('mongoose');
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');
const {
  beforeEach,
  afterEach,
  describe,
  expect,
  it,
} = require('@jest/globals');
const app = require('../src/app');

require('dotenv').config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

/* Testing the GET / route. */
describe('GET /', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });
});
