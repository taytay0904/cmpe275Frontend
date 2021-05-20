import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
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

}
