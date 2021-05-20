export interface Order {
    id: Int32Array;
    seller: Int32Array;
    buyer: Int32Array;
    bitcoinAmount: Float32Array;
    bitcoinPrice: Float32Array;
    currency:String;
    startDateTime: String;
    endDateTime: String;
    status: String;
    type: String;
    //bankAcount: BankAcount;
 }