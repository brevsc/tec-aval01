import { Account } from "@/account/signup/entities/account";
import { SignupError } from "@/account/signup/application/errors/SignupError";

export interface SaveAccount {
	save(account: Account): Promise<Account | SignupError>
}
