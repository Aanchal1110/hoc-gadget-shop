import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDialog } from '../customer-dialog/customer-dialog';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DialogBox } from '../dialog-box/dialog-box';

@Component({
  selector: 'app-customer',
  imports: [CommonModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {
  private modalService=inject(NgbModal);

   private cdr = inject(ChangeDetectorRef); 

  customerDetails:any[]=[];
  
  httpClient=inject(HttpClient);
  openCustomerDialog(){
    this.modalService.open(CustomerDialog).result.then(data=>{
      if(data.event=="closed"){
        this.getCustomerDetails();
      }
    });
  }

  ngOnInit(){
    this.getCustomerDetails();
  }
  getCustomerDetails(){
    let apiUrl="http://localhost:5113/api/Customer";
    this.httpClient.get(apiUrl).subscribe(result=>{
     this.customerDetails = result as any[];
     this.cdr.detectChanges(); 
      console.log(this.customerDetails);
    }

    )

  }
  openConfirmDialog(customerId:any){
    this.modalService.open(DialogBox).result.then(data=>{
      if(data.event=="confirm"){
        this.deletCustomer(customerId);
      }
    })
  }
  deletCustomer(customerId:any){
    let apiUrl="http://localhost:5113/api/Customer/";
    this.httpClient.delete(apiUrl+customerId).subscribe(data=>{
      this.getCustomerDetails();
    });
  
}
openEditDialogBox(customer:any){
  const modalReference=this.modalService.open(CustomerDialog);
  modalReference.componentInstance.customer1={
    customerId:customer.CustomerId,
    firstName:customer.FirstName,
    lastName:customer.LastName,
    email:customer.Email,
    phone:customer.Phone,
    registrationDate:customer.RegistrationDate
   };
   modalReference.result.then(data=>{
    if(data.event=="closed"){
      this.getCustomerDetails();
    }
  }


);
}
}
