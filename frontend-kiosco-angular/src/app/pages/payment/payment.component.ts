import { Component } from '@angular/core';
import { Order } from '../../interfaces/pedido';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FamilyService } from '../../services/family.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  tax: number = 0.21; /* 21% */
  totalPriceOrder: number = 0;
  products!: Order;
  deliveryMode: String = this.cartService.getConsumptionOption();
  paymentMethod: String = this.cartService.getPaymentMethod();

  firstFamilyId: any = '';

  constructor(
    private cartService: OrderService,
    private familyService: FamilyService
  ) {
    this.firstFamilyId = this.familyService.getFirstFamilyId();
  }

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
    return Math.round(this.products.total * this.tax * 100) / 100;
  }

  getTotalPriceOrder():void{
    this.totalPriceOrder = Math.round((this.getTaxs() + this.products.total) * 100) / 100;
  }

  ngOnInit() {
    this.products = this.getOrderProducts();
    this.getTotalPriceOrder();
  }
}
