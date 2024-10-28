import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Menu, Product } from '../../interfaces/pedido';
import { OrderService } from '../../services/order.service';
import { AppConfig } from '../../../config/app-config';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ConfirmModalComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product!: Product | Menu;

  // Emitir evento cuando se haga clic en el producto
  @Output() productClicked = new EventEmitter<Product | Menu>();

  noPhotoUrl = AppConfig.NO_PHOTO_URL;
  isMenu!:Boolean;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.product.img = this.product.img || this.noPhotoUrl;
  }

  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

  openConfirmModal(product: any): void {
    this.confirmModal.open(product);
  }

  onConfirm(productDetails: { product: Product | Menu, quantity: number }): void {
    this.orderService.addProduct(productDetails.product, productDetails.quantity);
    console.log('Confirmado');
  }

  onCancel(): void {
    console.log('Cancelado');
  }
}
