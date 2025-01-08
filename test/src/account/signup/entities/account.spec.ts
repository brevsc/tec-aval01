// src/account/signup/entities/account.test.ts
import { Account } from '@/account/signup/entities/account';

describe('Account entity', () => {
  it('should create an instance with valid properties', () => {
    const account = new Account(
      '1234',
      'User Test',
      'test@example.com',
      '123456789',
      'ABC1234',
      true,
      false,
      'password123',
      'argon2'
    );

    expect(account.account_id).toBe('1234');
    expect(account.name).toBe('User Test');
    expect(account.email).toBe('test@example.com');
    expect(account.cpf).toBe('123456789');
    expect(account.car_plate).toBe('ABC1234');
    expect(account.is_passenger).toBe(true);
    expect(account.is_driver).toBe(false);
    expect(account.password).toBe('password123');
    expect(account.password_algorithm).toBe('argon2');
  });
});