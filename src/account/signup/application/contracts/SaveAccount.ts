import { Account } from "../../entities/account";
import { SignupError } from "../errors/SignupError";

export interface SaveAccount {
	save(account: Account): Promise<Account | SignupError>
}
