import { Account } from "@/account/signup/entities/account";
import { SignupError } from "@/account/signup/application/errors/SignupError";
import { SaveAccount, GetAccount } from "@/account/signup/application/contracts/";

export class SignupService {
  constructor(
    private readonly account: Account,
    private readonly accountRepository: SaveAccount,
    private readonly getAccount: GetAccount,
  ) {}

  async execute() {
    try {
      const cpfValidatorRegex = /^(?!([0-9])\1{10})\d{11}$/;
      if (!cpfValidatorRegex.test(this.account.cpf)) throw new SignupError();

      if (await this.getAccount.byEmail(this.account.email)) throw new SignupError();
      
      return this.accountRepository.save(this.account);
    } catch {
      throw new SignupError();
    }
  }
}
