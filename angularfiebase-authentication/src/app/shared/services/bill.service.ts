import { Injectable, NgZone, SystemJsNgModuleLoader } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user';
import { AuthService } from './auth.service';
import { Bill } from './bill';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class BillService {

  public user : User;
  apiServerUrl = environment.apiBaseUrl;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
    ) { }



  public getBill(): Observable<Bill[]>{
    return this.http.get<Bill[]>(`${this.apiServerUrl}/bill/sender/${this.authService.getUserEmail()}`)
  }

  public getReceiveBill(): Observable<Bill[]>{
    return this.http.get<Bill[]>(`${this.apiServerUrl}/bill/receiver/${this.authService.getUserEmail()}`)
  }

  public createBill(bill: Bill): Observable<Bill>{
    bill.sender = this.authService.getUserEmail();
    return this.http.post<Bill>(`${this.apiServerUrl}/bill`, bill)
  }

  public updateBill(bill: Bill): Observable<Bill>{
    console.log("updateBill  service is calling " + bill.id);
    return this.http.put<Bill>(`${this.apiServerUrl}/bill/${bill.id}`,bill);
  }

  public deleteEmployee(billId: number): Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/cancelBill/${billId}`,billId);
    

   
  }


}
