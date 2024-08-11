import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Product } from '../../interfaces/product';
import { OrderService } from '../../services/order.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ConfirmModalComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: Product;

  constructor(private orderService: OrderService,
    private cartService: OrderService,


  ) { }

  addThisProductToCart(product: Product): void{
    this.cartService.addProduct(product);
  }

  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

  openConfirmModal(product: any): void {
    this.confirmModal.open(product);
  }

  onConfirm(product: Product): void {
    this.addThisProductToCart(product)
    console.log('Confirmado');
  }

  onCancel(): void {
    console.log('Cancelado');
  }

  
}
