import { Component, NgZone, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { Bill } from 'src/app/shared/services/bill';
import { HttpErrorResponse } from '@angular/common/http';
import { BillService } from 'src/app/shared/services/bill.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  public sendBills: Bill[];
  public receiveBills: Bill[];
  public editBill: Bill;
  public deleteBill: Bill;

  constructor(
    public authService: AuthService,
    public billService: BillService,
    public router: Router,
    public ngZone: NgZone,
    public orderService: OrderService,

  ) { }

  ngOnInit(): void {
    this.getBills();
  }

public getBills(): void {
  this.billService.getBill().subscribe(
    (response: Bill[]) => {
      this.sendBills = response;
      console.log(this.sendBills);
    },
    (error: HttpErrorResponse) => {
      alert(error.error);
    }
  );
  this.billService.getReceiveBill().subscribe(
    (response: Bill[]) => {
      this.receiveBills = response;
      console.log(this.receiveBills);
    },
    (error: HttpErrorResponse) => {
      alert(error.error);
    }
  );
}

onAddBill(addForm: NgForm): void {
  console.log("adding a bill");
  document.getElementById('add-bill-form').click();
  this.billService.createBill(addForm.value).subscribe(
    (response: Bill) => {
      console.log(response);
      this.getBills();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.error);
      addForm.reset();
    }
  );
}

public onUpdateEmloyee(bill: Bill): void {
  this.billService.updateBill(bill).subscribe(
    (response: Bill) => {
      console.log(response.id);
      this.getBills();
    },
    (error: HttpErrorResponse) => {
      alert(error.error);
    }
  );
}

public onDeleteEmloyee(billID: number): void {
  this.billService.deleteEmployee(billID).subscribe(
    (response: void) => {
      console.log(response);
      this.getBills();
    },
    (error: HttpErrorResponse) => {
      alert(error.error);
    }
  );
}


public onOpenModal(bill: Bill, mode: string): void {
  const container = document.getElementById('bill-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    console.log("adding add button");
    button.setAttribute('data-target', '#addEmployeeModal');
  }
  if (mode === 'edit') {
    this.editBill = bill;
    console.log("editing id is" +bill.id )
    button.setAttribute('data-target', '#updateEmployeeModal');
  }
  if (mode === 'delete') {
    this.deleteBill = bill;
    button.setAttribute('data-target', '#deleteEmployeeModal');
  }
  container.appendChild(button);
  
  button.click();
}

}






