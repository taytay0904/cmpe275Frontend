export interface BankAccount {
    bankName: string;
    country: string;
    accountNumber: string;
    owernName: string;
    //balance: Float32Array;
    address: string,
    primaryCurrency: string,
    balanceOfUSD: BigInteger,
    balanceOfEUR: BigInteger,
    balanceOfGBP: BigInteger,
    balanceOfINR: BigInteger,
    balanceOfRMB: BigInteger,
    balanceOfBitcoin: BigInteger
 }