import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-inventory',
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory {
  httpClient=inject(HttpClient)

  inventoryData={
    productID:"",
    productName:"",
    availableQty:0,
    reOrderPoint:0
  }
  inventoryDetails:any;

  ngOnInit() {
    let apiUrl = "http://localhost:5113/api/Inventory";
    this.httpClient.get(apiUrl).subscribe(data=>{
      this.inventoryDetails=data;
      console.log(this.inventoryDetails);
    })
  }

  onSubmit():void{
   let apiUrl = "http://localhost:5113/api/Inventory";
    let httpOptions={
      headers: new HttpHeaders({
        Authorization:"my-auth-token",
        'Content-Type':"application/json"
      })
    }
    this.httpClient.post(apiUrl,this.inventoryData,httpOptions).subscribe({
      next:v=> console.log(v),
      error:e=>console.log(e),
      complete:()=> {
          alert("Form submitted successfully"+JSON.stringify(this.inventoryData));
          this.ngOnInit();
      },

    })


  }
}
