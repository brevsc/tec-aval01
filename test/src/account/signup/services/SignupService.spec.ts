import { SignupService } from "@/account/signup/application/services/SignupService";
import { Account } from "@/account/signup/entities/account";
import { SaveAccount, GetAccount } from "@/account/signup/application/contracts";
import { SignupError } from "@/account/signup/application/errors/SignupError";

describe("SignupService", () => {
  it("should save account successfully", async () => {
    const account = new Account(
      "1234",
      "User Test",
      "test@example.com",
      "98765432109",
      "ABC1234",
      true,
      false,
      "password123",
      "argon2"
    );

    const accountRepositoryMock = {
      save: jest.fn().mockResolvedValue(account),
    } as unknown as SaveAccount;

    const getAccountMock = {
      byEmail: jest.fn().mockResolvedValue(null),
    } as unknown as GetAccount;

    const signupService = new SignupService(account, accountRepositoryMock, getAccountMock);

    const result = await signupService.execute();

    expect(result).toBe(account);
    expect(accountRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(accountRepositoryMock.save).toHaveBeenCalledWith(account);
  });

  it("should throw SignupError when saving account fails", async () => {
    const account = new Account(
      "1234",
      "User Test",
      "test@example.com",
      "98765432109",
      "ABC1234",
      true,
      false,
      "password123",
      "argon2"
    );

    const accountRepositoryMock = {
      save: jest.fn().mockRejectedValue(new SignupError()),
    } as unknown as SaveAccount;

    const getAccountMock = {
      byEmail: jest.fn().mockResolvedValue(null),
    } as unknown as GetAccount;

    const signupService = new SignupService(account, accountRepositoryMock, getAccountMock);

    await expect(signupService.execute()).rejects.toThrow(SignupError);
    expect(accountRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(accountRepositoryMock.save).toHaveBeenCalledWith(account);
  });

  it("should throw SignupError for invalid CPF", async () => {
    const invalidCPF = '11111111111';
    const account = new Account(
      "1234",
      "User Test",
      "test@example.com",
      invalidCPF,
      "ABC1234",
      true,
      false,
      "password123",
      "argon2"
    );

    const accountRepositoryMock = {
      save: jest.fn(),
    } as unknown as SaveAccount;

    const getAccountMock = {
      byEmail: jest.fn().mockResolvedValue(null),
    } as unknown as GetAccount;

    const signupService = new SignupService(account, accountRepositoryMock, getAccountMock);

    await expect(signupService.execute()).rejects.toThrow(SignupError);
    expect(accountRepositoryMock.save).not.toHaveBeenCalled();
  });

  it("should returns SignupError when the account already exists", async () => {
    const account = new Account(
      "1234",
      "User Test",
      "test@example.com",
      "98765432109",
      "ABC1234",
      true,
      false,
      "password123",
      "argon2"
    );

    const accountRepositoryMock = {
      save: jest.fn(),
    } as unknown as SaveAccount;

    const getAccountMock = {
      byEmail: jest.fn().mockResolvedValue(account),
    } as unknown as GetAccount;

    const signupService = new SignupService(account, accountRepositoryMock, getAccountMock);

    await expect(signupService.execute()).rejects.toThrow(SignupError);
    expect(getAccountMock.byEmail).toHaveBeenCalledTimes(1);
    expect(getAccountMock.byEmail).toHaveBeenCalledWith(account.email);

  })
});
