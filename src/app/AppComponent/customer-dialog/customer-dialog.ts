import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { first } from 'rxjs';

@Component({
  selector: 'app-customer-dialog',
  imports: [FormsModule, CommonModule],
  templateUrl: './customer-dialog.html',
  styleUrl: './customer-dialog.css',
})
export class CustomerDialog {
  httpClient=inject(HttpClient)

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
}
});
}

}
