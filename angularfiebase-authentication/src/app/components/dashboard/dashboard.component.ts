import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { User } from 'src/app/shared/services/user';
import { Observable } from 'rxjs';
import { BankAccount } from 'src/app/shared/services/bankAccount';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';


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
    console.log("html update" + addBankForm.value);
    this.authService.updateBank(addBankForm.value).subscribe(
      (response:BankAccount) => {
        console.log("update" + response);
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      });
    
  }

}
