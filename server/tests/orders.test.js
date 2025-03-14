import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import Order from '../models/Order.js';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Order.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

let authToken = '';

describe('Order API Tests', () => {
  beforeAll(async () => {
    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    authToken = loginRes.body.token;
  });

  let orderId;

  it('Should create a new order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        product: 'Laptop',
        quantity: 2,
        totalPrice: 2000,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    orderId = res.body._id;
  });

  it('Should fetch all orders', async () => {
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Should update an order', async () => {
    const res = await request(app)
      .put(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        quantity: 3,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(3);
  });

  it('Should delete an order', async () => {
    const res = await request(app)
      .delete(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
  });

  it('Should return 401 if no token is provided', async () => {
    const res = await request(app).get('/api/orders');
    expect(res.statusCode).toBe(401);
  });
});
