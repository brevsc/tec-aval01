import { Account } from "@/account/signup/entities/account";
import { SignupError } from "../errors/SignupError";
import { SaveAccount } from "../contracts/SaveAccount";

export class SignupService {
  constructor(
    private readonly account: Account,
    private readonly accountRepository: SaveAccount
  ) {}

  async execute() {
    try {
      return this.accountRepository.save(this.account);
    } catch {
      throw new SignupError();
    }
  }
}
