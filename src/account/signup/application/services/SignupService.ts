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
      const cpfValidatorRegex = /^(?!([0-9])\1{10})\d{11}$/;
      if (!cpfValidatorRegex.test(this.account.cpf)) throw new SignupError();
      
      return this.accountRepository.save(this.account);
    } catch {
      throw new SignupError();
    }
  }
}
