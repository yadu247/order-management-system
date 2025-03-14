import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import User from '../models/User.js';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

let authToken = '';

describe('Auth API Tests', () => {
  it('Should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('Should log in the user and return a token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    authToken = res.body.token;
  });

  it('Should return 401 for invalid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'wrong@example.com',
      password: 'wrongpassword',
    });

    expect(res.statusCode).toBe(401);
  });
});
