import { Component } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { OrderService } from '../../services/order.service';
import { Product } from '../../interfaces/pedido';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule,CartComponent],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent {
  products: Product[][] = [];
  totalPrice: number = 0;

  constructor(private cartService: OrderService, private router: Router) {}

  ngOnInit() {
    this.cartService.products.subscribe((products) => {
      this.products = products;
      this.totalPrice = this.cartService.totalPrice;
    });
  }

  subtractProduct(product: Product): void{
    this.cartService.subtractProduct(product);
  }

  addSameProduct(product: Product): void{
    this.cartService.addProduct(product);
  }
  
  displayPaymentPage(): void{
    localStorage.setItem('order', JSON.stringify(this.products));
    this.router.navigate(['/payment']);
  }

  toggleCart(): void{
    const cartContainer = document.getElementById('cartContainer');
    cartContainer?.classList.toggle('open');
  }
}
