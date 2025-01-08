import { Account } from "../../entities/account";
import { SignupError } from "../errors/SignupError";

export interface AccountRepositoryInterface {
	save(account: Account): Promise<Account | SignupError>
}
