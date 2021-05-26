import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Order } from 'src/app/shared/services/order';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders: Order[];

  constructor(
    public authService: AuthService,
    public orderService: OrderService,
    public router: Router,
    public ngZone: NgZone) { }

  ngOnInit(): void {
    this.findTrans(null,null);
  }

  public getOrders(): void {
    this.orderService.getOrder().subscribe(
      (response: Order[] ) => {
        this.orders = response;
       console.log( "order is" + this.orders);
      }
    
    )
  }

  public findTrans(startTime, endTime): void {
    this.orderService.getTransactions(startTime, endTime).subscribe(
      (response: Order[] ) => {
        this.orders = response;
       console.log( "order is" + this.orders);
      }
      ,
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
