import { SignupService } from "@/account/signup/application/services/SignupService";
import { Account } from "@/account/signup/entities/account";
import { AccountRepositoryInterface } from "@/account/signup/application/contracts/AccountRepositoryInterface";
import { SignupError } from "@/account/signup/application/errors/SignupError";

describe('SignupService', () => {
  it('should save account successfully', async () => {
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

    const accountRepositoryMock = {
      save: jest.fn().mockResolvedValue(account),
    } as unknown as AccountRepositoryInterface;

    const signupService = new SignupService(account, accountRepositoryMock);

    const result = await signupService.execute();

    expect(result).toBe(account);
    expect(accountRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(accountRepositoryMock.save).toHaveBeenCalledWith(account);
  });

  it('should throw SignupError when saving account fails', async () => {
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

    const accountRepositoryMock = {
      save: jest.fn().mockRejectedValue(new SignupError()),
    } as unknown as AccountRepositoryInterface;

    const signupService = new SignupService(account, accountRepositoryMock);

    await expect(signupService.execute()).rejects.toThrow(SignupError);
    expect(accountRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(accountRepositoryMock.save).toHaveBeenCalledWith(account);
  });
});
