import { Component, Input, ViewChild} from '@angular/core';
import { Menu, Product } from '../../interfaces/pedido';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { OrderService } from '../../services/order.service';
import { AppConfig } from '../../../config/app-config';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ConfirmModalComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: (Product | Menu);

  noPhotoUrl = AppConfig.NO_PHOTO_URL;

  isMenu! : boolean;

  constructor(private orderService: OrderService,

  ) { 
    const item: Product | Menu = this.product; 
  }


  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;


  openConfirmModal(product: any): void {
    this.confirmModal.open(product);
  }

  onConfirm(productDetails: { product: Product | Menu, quantity: number }): void {
    console.log(productDetails);
    this.orderService.addProduct(productDetails.product , productDetails.quantity);
    console.log('Confirmado');
  }

  onCancel(): void {
    console.log('Cancelado');
  }

  
}
