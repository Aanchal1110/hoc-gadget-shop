import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';

@Component({
  selector: 'app-customer-dialog',
  imports: [FormsModule, CommonModule],
  templateUrl: './customer-dialog.html',
  styleUrl: './customer-dialog.css',
})
export class CustomerDialog {

  disabledCustomerId=false;

  buttonText="Add";

  @Input() private customer1:any;

  httpClient=inject(HttpClient)

  modal=inject(NgbActiveModal)


  customer={
    customerId:"",
    firstName:"",
    lastName:"",
    registrationDate:"",
    phone:"",
    email:""
  }
onSubmit(){
let apiUrl="http://localhost:5113/api/Customer";
let httpOptions={

headers:new HttpHeaders({
  Authorization:'my-auth-token',
  'Content-Type':'application/json'

})
}
this.httpClient.post(apiUrl, this.customer, httpOptions).subscribe({
  next:v=>console.log(v),
  error:e=>console.log(e),
  complete:()=>
  {
    alert("Customer details saved successfully: "+JSON.stringify(this.customer));
    this.modal.close({event:"closed"});
}
});
}
ngOnInit(){
  if(this.customer1 !=null){
    this.customer=this.customer1;
    this.buttonText="Update";
    this.disabledCustomerId=true;
  }
}

}
