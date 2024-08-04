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


  ) { }

  addToCart(product: Product) {
    // this.orderService.addProduct(product);
    // Abrir modal de confirmación
    
  }

  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

  openConfirmModal(product: any): void {
    this.confirmModal.open(product);
  }

  onConfirm(): void {
    console.log('Confirmado');
  }

  onCancel(): void {
    console.log('Cancelado');
  }

  
}
