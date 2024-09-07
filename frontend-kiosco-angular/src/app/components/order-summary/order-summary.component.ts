import { Component, ViewChild } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { OrderService } from '../../services/order.service';
import { Menu, Order, Product } from '../../interfaces/pedido';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AppConfig } from '../../../config/app-config';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EditModalComponent } from '../modals/edit-modal/edit-modal.component';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule,CartComponent, EditModalComponent],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
  animations: [
    trigger('dropdownAnimation', [
      state('void', style({
        height: '0',
        opacity: '0',
        overflow: 'hidden'
      })),
      state('*', style({
        height: '*',
        opacity: '1',
        overflow: 'hidden'
      })),
      transition('void <=> *', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class OrderSummaryComponent {
  noPhotoUrl = AppConfig.NO_PHOTO_URL;

  products!: Order;
  totalPrice: number = 0;

  isDropdownOpen: { [key: number]: boolean } = {}; 

  @ViewChild('editModal') editModal!: EditModalComponent;

  constructor(
    private cartService: OrderService,
    private router: Router,
    public productService: ProductService
  ) {}

  ngOnInit() {
    console.log(this.products == null || this.products.items == undefined || this.products.items.length <= 0);
    this.cartService.products.subscribe((products) => {
      if(products != null) this.products = products;
      this.totalPrice = this.cartService.totalPrice;
      console.log(this.products);
    });
  }

  subtractProduct(product: Product | Menu): void{
    this.cartService.subtractProduct(product);
  }

  addSameProduct(product: Product | Menu): void{
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


  toggleDropdown(index: number): void {
    this.isDropdownOpen[index] = !this.isDropdownOpen[index];
  }
  

  openEditModal(product : Product | Menu, index : number): void {
    console.log(product);
    this.editModal.open(product, index);
  }


  onConfirm(productDetails: { product: Product | Menu, quantity: number }): void {
    console.log('Confirmado en order-summary');
    this.totalPrice = this.cartService.totalPrice;
  }

  onCancel(): void {
    console.log('Cancelado');
    this.totalPrice = this.cartService.totalPrice;
  }
}
