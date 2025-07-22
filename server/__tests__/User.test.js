const mongoose = require('mongoose');
const User = require('../models/User');

describe('User Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopping-list-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should create a new user with hashed password', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123'
    };

    const user = new User(userData);
    await user.save();

    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
    expect(user.email).toBe('john@example.com');
    expect(user.password).not.toBe('password123');
    expect(user.password.length).toBeGreaterThan(10);
  });

  test('should not create user without required fields', async () => {
    const user = new User({
      firstName: 'John'
    });

    await expect(user.save()).rejects.toThrow();
  });

  test('should validate email format', async () => {
    const user = new User({
      email: 'invalid-email',
      password: 'password123'
    });

    await expect(user.save()).rejects.toThrow();
  });

  test('should validate password minimum length', async () => {
    const user = new User({
      email: 'test@example.com',
      password: '123'
    });

    await expect(user.save()).rejects.toThrow();
  });

  test('should verify correct password', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123'
    };

    const user = new User(userData);
    await user.save();

    const isValid = await user.isCorrectPassword('password123');
    expect(isValid).toBe(true);

    const isInvalid = await user.isCorrectPassword('wrongpassword');
    expect(isInvalid).toBe(false);
  });

  test('should allow adding items to shopping list', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123',
      shoppingList: [
        {
          item: new mongoose.Types.ObjectId(),
          quantity: 2
        }
      ]
    });

    await user.save();
    expect(user.shoppingList).toHaveLength(1);
    expect(user.shoppingList[0].quantity).toBe(2);
  });

  test('should set default quantity to 1 for shopping list items', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123',
      shoppingList: [
        {
          item: new mongoose.Types.ObjectId()
        }
      ]
    });

    await user.save();
    expect(user.shoppingList[0].quantity).toBe(1);
  });
});