import { Component, input } from '@angular/core';
import { Order, Product } from '../../interfaces/pedido';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  tax: number = 0.21; /* 21% */
  products!: Order;
  deliveryMode: String = this.cartService.getConsumptionOption();
  paymentMethod: String = this.cartService.getPaymentMethod();

  constructor(private cartService: OrderService) {}

  getOrderProducts(): Order {
    return this.cartService.getOrder();
  }

  setDeliveryMethod(method: string): void {
    this.cartService.setConsumptionOption(method);
  }

  setPaymentMethod(method: string): void {
    this.cartService.setPaymentMethod(method);
  }

  getTaxs():number{
    return this.products.total * this.tax;
  }

  ngOnInit() {
    this.products = this.getOrderProducts();
  }
}
