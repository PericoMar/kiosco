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
import { SuggestionsComponent } from '../suggestions/suggestions.component';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule,CartComponent, EditModalComponent,SuggestionsComponent,ConfirmModalComponent],
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
  selectedProduct!: Product | Menu;
  isMenu!:Boolean;

  isDropdownOpen: { [key: number]: boolean } = {}; 

  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;
  @ViewChild('editModal') editModal!: EditModalComponent;
  editingProduct!: Product | Menu;

  constructor(
    public cartService: OrderService,
    private router: Router,
    public productService: ProductService
  ) {}

  ngOnInit() {
    this.cartService.products.subscribe((products) => {
      if(products != null) this.products = products;
      this.totalPrice = this.cartService.totalPrice;

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
    const editingProduct = {...product};
    this.editingProduct = editingProduct

    this.editModal.open(editingProduct, index);
  }


  onConfirmEdit(productDetails: { product: Product | Menu, quantity: number }): void {
    console.log(this.cartService.products);
    this.cartService.subtractProduct(this.editingProduct);
    console.log(this.cartService.products);
    this.cartService.addProduct(productDetails.product, productDetails.quantity);
    console.log(this.cartService.products);
    console.log('Confirmado');
  }

  // Maneja el emiter del product-suggered
  onProductSelectedFromSuggestions(product: any): void {
    this.selectedProduct = product;  // Asignar el producto seleccionado
    this.confirmModal.open(product);  // Abrir el modal
  }

  onConfirmSuggered(productDetails: { product: Product | Menu, quantity: number }): void {
    this.cartService.addProduct(productDetails.product, productDetails.quantity);
  }

  onCancelSuggered(): void {
    console.log('Cancelado');
  }

  onConfirm(productDetails: { product: Product | Menu, quantity: number }): void {
    this.totalPrice = this.cartService.totalPrice;
  }

  onCancel(): void {
    console.log('Cancelado');
    this.totalPrice = this.cartService.totalPrice;
  }
}
