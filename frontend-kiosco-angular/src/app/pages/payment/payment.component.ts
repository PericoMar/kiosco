import { Component, input } from '@angular/core';
import { Product } from '../../interfaces/pedido';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  products: Product[][] = [];
  deliveryMode: String = "";
  paymentMethod: String = "";
  /* USAR LOCAL/SESSION STORAGE PARA PERSISTIR LOS DATOS DEL PEDIDO */
  /* Mirar si es mas optimo en backend */

  constructor(private cartService: OrderService){}

  getOrderProducts(): Product[][] {
    let data = localStorage.getItem('order');
    if (data) {
      this.deliveryMode = this.cartService.getConsumptionOption()
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  setPaymentMethod(method:string): void{
    this.cartService.setPaymentMethod(method);
  }


  ngOnInit() {
    this.products = this.getOrderProducts();
  }
}
