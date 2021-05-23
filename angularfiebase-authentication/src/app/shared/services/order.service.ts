import { Injectable, NgZone, SystemJsNgModuleLoader } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user';
import { AuthService } from './auth.service';
import { Order } from './order';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public user : User;
  apiServerUrl = environment.apiBaseUrl;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
    ) { }

  public getOrder(): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.apiServerUrl}/appUser/Order/${this.authService.getUserEmail()}`)
  }

  public getOpenOrder(): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.apiServerUrl}/appUser/Order/${this.authService.getUserEmail()}`)
  }

  public sellOrder(order: Order): Observable<Order>{
    order.seller = this.authService.getUserEmail();
    console.log("order service is calling " + order.seller);
    return this.http.post<Order>(`${this.apiServerUrl}/orderOfSelling`,order);
  }

  public buyOrder(order: Order): Observable<Order>{
    order.buyer = this.authService.getUserEmail();
    return this.http.post<Order>(`${this.apiServerUrl}/orderOfBuying`,order);
  }

}


// import { Injectable, NgZone } from '@angular/core';
// import { User } from "../services/user";
// import { AngularFireAuth } from "@angular/fire/auth";
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { Router } from "@angular/router";
// import * as firebase from 'firebase';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
// import { BankAccount } from './bankAccount';

// @Injectable({
//   providedIn: 'root'
// })


// export class AuthService {
//   userData: any; // Save logged in user data
//   apiServerUrl = environment.apiBaseUrl;

//   constructor(
//     public http: HttpClient,
//     public afs: AngularFirestore,   // Inject Firestore service
//     public afAuth: AngularFireAuth, // Inject Firebase auth service
//     public router: Router,
//     public ngZone: NgZone // NgZone service to remove outside scope warning
//   ) {
//     /* Saving user data in localstorage when
//     logged in and setting up null when logged out */
//     this.afAuth.authState.subscribe(user => {
//       if (user) {
//         this.userData = user;
//         localStorage.setItem('user', JSON.stringify(this.userData));
//         JSON.parse(localStorage.getItem('user'));
//       } else {
//         localStorage.setItem('user', null);
//         JSON.parse(localStorage.getItem('user'));
//       }
//     })
//   }

//   public getOrders(): Observable<BankAccount> {
//     // this.getUserID();
//    // return this.http.get<any>(`${this.apiServerUrl}/appUser/${this.getUserID()}`)
//    return this.http.get<BankAccount>(`${this.apiServerUrl}/appUser/email/${this.getUserEmail()}`)
//   }

// }