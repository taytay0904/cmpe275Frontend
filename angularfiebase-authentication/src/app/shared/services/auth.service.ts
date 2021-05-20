import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BankAccount } from './bankAccount';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  apiServerUrl = environment.apiBaseUrl;

  constructor(
    public http: HttpClient,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password,nickname) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
        this.writeUserData(result.user, nickname);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    console.log('sendingemail');
    return firebase.default.auth().currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.default.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
      //bankAcount: user.bankAccount
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

  writeUserData(user, nickname) {
    firebase.default.database().ref('users/' + user.uid).set({
      username: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified
    });
  }

  public getUserID(user){
    // firebase.default.auth().onAuthStateChanged(user => {
    //   if(user){
    //     return user.uid;
    //   }
    // })
   
    //console.log( firebase.default.database().ref('users/'+ user.uid).get());
    return firebase.default.auth().currentUser.uid;
  }

  public getUserEmail(){
    const user = JSON.parse(localStorage.getItem('user'));
    //console.log("!!!!!!!!!!!!!" + user.email);
   // return firebase.default.auth().currentUser.email;
    return user.email;
  }

  public getUserData(uid){
    firebase.default.database().ref('users/' + uid).once("value", snap => {
      console.log(snap.val);
    })
  }

  public getUserBankInfo(): Observable<BankAccount> {
    // this.getUserID();
   // return this.http.get<any>(`${this.apiServerUrl}/appUser/${this.getUserID()}`)
   return this.http.get<BankAccount>(`${this.apiServerUrl}/appUser/email/${this.getUserEmail()}`)
   
  }

  // Routing to orders
  OderPage() {
    return this.ngZone.run(() => {
          this.router.navigate(['orders']);
        });
  }

  marketPage() {
    return this.ngZone.run(() => {
          this.router.navigate(['market']);
        });
  }


  updateBank(bank: BankAccount): Observable<BankAccount> {
    console.log("bank updated " + bank);
    return this.http.put<BankAccount>(`${this.apiServerUrl}/appUser/update`, bank);
  }
}
