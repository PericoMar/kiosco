import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,OrderSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  products: Product[][] = [];
  totalPrice: number = 0;
  countProducts: number =0;

  constructor(private cartService: OrderService) {}


  ngOnInit(): void{
    this.cartService.products.subscribe((products) => {
      this.products = products;
      this.totalPrice = this.cartService.totalPrice;
      this.countProducts = this.cartService.countTotalProducts;
    });
  }
  
  toggleCart(): void{
    const cartContainer = document.getElementById('cartContainer');
    cartContainer?.classList.toggle('open');
  }
}
