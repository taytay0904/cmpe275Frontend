export interface Order {
    id: number;
    seller: string;
    buyer: string;
    bitcoinAmount: number;
    bitcoinPrice: number;
    currency:string;
    startDateTime: string;
    endDateTime: string;
    status: string;
    type: string;
    //bankAcount: BankAcount;
 }