const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const usersController = require('../api/v1/controllers/users-controller');

const app = express();
app.use(express.json());

app.get('/users', usersController.getAllUsers);
app.get('/users/:id', usersController.getOneUser);
app.put('/users/:id', usersController.updateUser);
app.delete('/users/:id', usersController.deleteUser);
app.post('/auth', usersController.authenticateUser);

describe('Users Controller', () => {
  let userId;

  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopping-list-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    const user = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123'
    });
    const savedUser = await user.save();
    userId = savedUser._id;
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /users', () => {
    test('should get all users without passwords', async () => {
      const response = await request(app).get('/users');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].email).toBe('john@example.com');
      expect(response.body[0].password).toBeUndefined();
    });
  });

  describe('GET /users/:id', () => {
    test('should get one user by id without password', async () => {
      const response = await request(app).get(`/users/${userId}`);
      
      expect(response.status).toBe(200);
      expect(response.body.email).toBe('john@example.com');
      expect(response.body.password).toBeUndefined();
    });

    test('should return 404 for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app).get(`/users/${fakeId}`);
      
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found');
    });
  });

  describe('PUT /users/:id', () => {
    test('should update user successfully', async () => {
      const updateData = {
        firstName: 'Jane',
        lastName: 'Smith'
      };

      const response = await request(app)
        .put(`/users/${userId}`)
        .send(updateData);
      
      expect(response.status).toBe(200);
      expect(response.body.firstName).toBe('Jane');
      expect(response.body.lastName).toBe('Smith');
      expect(response.body.password).toBeUndefined();
    });
  });

  describe('DELETE /users/:id', () => {
    test('should delete user successfully', async () => {
      const response = await request(app).delete(`/users/${userId}`);
      
      expect(response.status).toBe(200);
      expect(response.body._id).toBe(userId.toString());

      const deletedUser = await User.findById(userId);
      expect(deletedUser).toBeNull();
    });
  });

  describe('POST /auth', () => {
    test('should authenticate user with correct credentials', async () => {
      const credentials = {
        email: 'john@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/auth')
        .send(credentials);
      
      expect(response.status).toBe(200);
      expect(response.body.email).toBe('john@example.com');
      expect(response.body.password).toBeUndefined();
    });

    test('should return 404 for non-existent user', async () => {
      const credentials = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/auth')
        .send(credentials);
      
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found');
    });

    test('should return 400 for incorrect password', async () => {
      const credentials = {
        email: 'john@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/auth')
        .send(credentials);
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid password');
    });
  });
});