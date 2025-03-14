import request from 'supertest';
import app from '../server';
import mongoose from 'mongoose';

let server;

beforeAll(done => {
  server = app.listen(4000, () => {
    console.log('Test server running on port 4000');
    done();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('Order API Tests', () => {
  it('Should fetch orders', async () => {
    const res = await request(server).get('/api/orders');
    expect(res.statusCode).toBe(200);
  });

  it('Should return 401 if no token provided', async () => {
    const res = await request(server).get('/api/orders');
    expect(res.statusCode).toBe(401);
  });
});
