import { BankAccount } from "./bankAccount";

export interface BackEndUser {
   email: string,
   nickName: string,
   password: string,
   bankAccount: BankAccount

//    address: string,
//    primaryCurrency: string,
//    balanceOfUSD: BigInteger,
//    balanceOfEUR: BigInteger,
//    balanceOfGBP: BigInteger,
//    balanceOfINR: BigInteger,
//    balanceOfRMB: BigInteger,
//    balanceOfBitcoin: BigInteger
}
