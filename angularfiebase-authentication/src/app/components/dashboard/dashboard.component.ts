import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { User } from 'src/app/shared/services/user';
import { Observable } from 'rxjs';
import { BankAccount } from 'src/app/shared/services/bankAccount';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { BackEndUser } from 'src/app/shared/services/backEndUser';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public bankAccount: BankAccount;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  public getBankAccount(): void {
    this.authService.getUserBankInfo().subscribe(
      (response: BankAccount ) => {
        this.bankAccount = response;
       console.log( "get bank" + this.bankAccount);
      }// },
      // (error: HttpErrorResponse) => {
      //   alert(error.message);
      // }
    )
  }
  ngOnInit() { 
    this.getBankAccount();
  }

  public updateBank(addBankForm: NgForm): void{
    document.getElementById('add-bank-form').click();
     console.log("addBankForm update" + addBankForm);
    this.authService.updateBank(addBankForm.value).subscribe(
      (response:BankAccount) => {
        console.log("update!!!!! addBankForm" + response);
        this.getBankAccount();
        addBankForm.reset();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
        addBankForm.reset();
      });
    
  }

  public createUser(addBankForm: NgForm): void{
    document.getElementById('add-bank-form').click();
     console.log("createUser update" + addBankForm);
    this.authService.createUser(addBankForm.value).subscribe(
      (response:BackEndUser) => {
        console.log("update!!!!! addBankForm" + response);
        this.getBankAccount();
        addBankForm.reset();
      },
      (error: HttpErrorResponse)=>{
        alert(error.statusText);
        addBankForm.reset();
      });
    
  }

}
