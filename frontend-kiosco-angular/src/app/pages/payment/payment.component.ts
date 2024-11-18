import { Component } from '@angular/core';
import { Order } from '../../interfaces/pedido';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FamilyService } from '../../services/family.service';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { PrinterService } from '../../services/printer/printer.service';
import { ProductService } from '../../services/product.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from '../../services/payment/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,BackButtonComponent, FooterComponent],
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
    public productService: ProductService,
    private familyService: FamilyService,
    private router:Router,
    private printerService: PrinterService,
    private paymentService: PaymentService
  ) {
    this.firstFamilyId = this.familyService.getFirstFamilyId();
  }

  ngOnInit() {
    this.products = this.getOrderProducts();
    this.getTotalPriceOrder();
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

  getTaxs(): number {
    let sum = 0;
    this.products.items.forEach(elem => {
      // Monto de IVA por producto.
      sum += elem.quantity * (Math.round((elem.details.price) *  this.tax * 100) / 100);
      console.log(sum)
    });
    return sum;
  }

  getTotalPriceOrder():void{
    this.totalPriceOrder = Math.round((this.getTaxs() + this.products.total) * 100) / 100;
  }

  onCheckout(){
    const order = {
      ...this.products,
    }
    if(this.paymentMethod === 'efectivo'){
      this.printerService.printTicket(order).subscribe({
        next : (response) => {
          console.log(response);
        },
        error : (error) => {
          console.error(error);
        }
      });
      this.router.navigate(['/confirm-page']);
    } else {
      this.paymentService.openCardPaymentModal(order);
      this.router.navigate(['/payment-card']);
    }
  }

  
}
