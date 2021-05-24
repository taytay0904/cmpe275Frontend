export interface BankAccount {
    bankName: string;
    country: string;
    accountNumber: string;
    owernName: string;
    //balance: Float32Array;
    address: string,
    primaryCurrency: string,
    balanceOfUSD: number,
    balanceOfEUR: number,
    balanceOfGBP: number,
    balanceOfINR: number,
    balanceOfRMB: number,
    balanceOfBitcoin: number
 }