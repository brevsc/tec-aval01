import { Account } from "@/account/signup/entities/account";

export interface GetAccount {
  byEmail(email: string) : Promise<Account | null>;
}