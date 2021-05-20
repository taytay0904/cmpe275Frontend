export interface BankAccount {
    bankName: string;
    country: string;
    accountNumber: string;
    owernName: string;
    //balance: Float32Array;
    address: string,
    primaryCurrency: string,
    balanceOfUSD: Float32Array,
    balanceOfEUR: Float32Array,
    balanceOfGBP: Float32Array,
    balanceOfINR: Float32Array,
    balanceOfRMB: Float32Array,
    balanceOfBitcoin: Float32Array
 }