import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Order } from 'src/app/shared/services/order';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  public openOrders: Order[];
  public sellorder:Order;

  constructor(
    public authService: AuthService,
    public orderService: OrderService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.getOpendOrders();
  }

  public getOpendOrders(): void {
    this.orderService.getOrder().subscribe(
      (response: Order[] ) => {
        this.openOrders = response;
       //console.log( "order is" + this.orders);
      }
    )
  }

  public buyOrder(buyOrderForm: NgForm): void{
    document.getElementById('buyOrder-form').click();
     console.log("buy order update" + buyOrderForm.value);
    this.orderService.buyOrder(buyOrderForm.value).subscribe(
      (response:Order) => {
        console.log("update!!!!! buy order bitcoinAmount" + response);
        this.getOpendOrders();
        buyOrderForm.reset();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
        buyOrderForm.reset();
      });
    
  }

  public sellOrder(sellOrderForm: NgForm): void{
    document.getElementById('sellOrder-form').click();
     console.log("sell order update" + sellOrderForm.value);
    this.orderService.sellOrder(sellOrderForm.value).subscribe(
      (response:Order) => {
        console.log("update sell order " + response);
        this.getOpendOrders();
        sellOrderForm.reset();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
        sellOrderForm.reset();
      });

    
    

    

  }

  // public sellOrder(): void{
    
  //    //console.log("sell order update" + addOrderForm);
  //   this.orderService.sellOrder(this.sellorder).subscribe(
  //     (response:Order) => {
  //       console.log("update sell order " + response);
  //       this.getOpendOrders();

  //     },
  //     (error: HttpErrorResponse)=>{
  //       alert(error.message);
       
  //     });

    
    

    

  // }

}
