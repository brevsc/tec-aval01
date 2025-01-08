import { Account } from "@/account/signup/entities/account";
import { SignupError } from "../errors/SignupError";
import { AccountRepositoryInterface } from "../contracts/AccountRepositoryInterface";

export class SignupService {
	constructor(
		private readonly account: Account,
		private readonly accountRepository: AccountRepositoryInterface
	) {}

	async execute() {
		try {
			return this.accountRepository.save(this.account);
		} catch {
			throw new SignupError();
		}
	}
}
