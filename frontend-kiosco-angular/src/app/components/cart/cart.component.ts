import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit{
  products: Product[] = [];
  total: number = 0;
  countProducts: number = 0;

  constructor(private cartService: CartService) {}

  getTotalPrice(){
    this.total = this.products.reduce((sum, product) => sum + product.price, 0);
  }

  countTotalProducts(){
    this.countProducts = this.products.length;
  }

  ngOnInit() {
    this.cartService.products.subscribe(products =>{
      console.log(products)
      this.products = products;
      this.getTotalPrice();
      this.countTotalProducts();
    })
  }

  toggleCart() {
    const cartContainer = document.getElementById('cartContainer');
    const cartButton = document.getElementById('cart-button');
    cartContainer?.classList.toggle('open');
    cartButton?.classList.toggle('hidden');
  }
}
