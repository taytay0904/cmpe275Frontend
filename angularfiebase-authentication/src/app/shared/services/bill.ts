import { User } from "./user";

export interface Bill {
   id: number,
   sender: string,
   receiver: string,
   description: string,
   balance: number,
   currency: string,
   dueDate: string,
   startDateTime: string,
   endDateTime: string,
   status:string,
   usre: User
   
}
