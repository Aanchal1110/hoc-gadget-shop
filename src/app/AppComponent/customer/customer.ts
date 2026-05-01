import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDialog } from '../customer-dialog/customer-dialog';

@Component({
  selector: 'app-customer',
  imports: [],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {
  private modalService=inject(NgbModal);
  openCustomerDialog(){
    this.modalService.open(CustomerDialog);
  }
}
