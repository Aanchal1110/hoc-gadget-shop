import { Component, inject, ChangeDetectorRef, Inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DialogBox } from '../../AppComponent/dialog-box/dialog-box';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inventory',
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory {
  httpClient = inject(HttpClient);
  cdr = inject(ChangeDetectorRef); 
  productIdTodelete:number=0;
  
  private modalService= inject(NgbModal)

  inventoryData = {
    productID: "",
    productName: "",
    availableQty: 0,
    reOrderPoint: 0
  };

  inventoryDetails: any[] = [];

  loadInventory() {
    let apiUrl = "http://localhost:5113/api/Inventory";
    this.httpClient.get(apiUrl).subscribe({
      next: (data: any) => {
        this.inventoryDetails = data;
        this.cdr.detectChanges();         // ← added here, forces screen to update
        console.log('Data loaded:', this.inventoryDetails);
      },
      error: (e) => {
        console.log('Error:', e);
      }
    });
  }

  ngOnInit() {
    this.loadInventory();
  }

  onSubmit(): void {
    let apiUrl = "http://localhost:5113/api/Inventory";
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: "my-auth-token",
        'Content-Type': "application/json"
      })
    };
    this.httpClient.post(apiUrl, this.inventoryData, httpOptions).subscribe({
      next: v => console.log(v),
      error: e => console.log(e),
      complete: () => {
        alert("Form submitted successfully!");
        this.loadInventory();
      }
    });
  }

  openConfirmDialog(productId: number){
    this.productIdTodelete=productId;
    console.log("Product ID to delete:", this.productIdTodelete);

    this.modalService.open(DialogBox);
  }
}