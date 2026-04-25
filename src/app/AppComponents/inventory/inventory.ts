import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-inventory',
  imports: [FormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory {
  httpClient=inject(HttpClient)

  inventoryData={
    productID:"",
    productName:"",
    availableQty:0,
    reorderPoint:0
  }

  onSubmit():void{
    let apiUrl="https://localhost:7138/api/Inventory";
    let httpOptions={
      headers: new HttpHeaders({
        Authorization:"my-auth-token",
        'Content-Type':"applicationn/json"
      })
    }
    this.httpClient.post(apiUrl,this.inventoryData,httpOptions).subscribe({
      next:v=> console.log(v),
      error:e=>console.log(e),
      complete:()=> {
          alert("Form submitted successfully"+JSON.stringify(this.inventoryData));
      },

    })


  }
}
