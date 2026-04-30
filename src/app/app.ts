import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Inventory } from './AppComponents/inventory/inventory';
import { Customer } from './AppComponent/customer/customer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, Inventory, Customer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hoc-gadget-shop');
}
