import { Component, Input, ViewChild} from '@angular/core';
import { Menu, Product } from '../../interfaces/pedido';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ConfirmModalComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: (Product | Menu);

  constructor(private orderService: OrderService,

  ) { }


  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

  openConfirmModal(product: any): void {
    this.confirmModal.open(product);
  }

  onConfirm(product: Product | Menu): void {
    this.orderService.addProduct(product);
    console.log('Confirmado');
  }

  onCancel(): void {
    console.log('Cancelado');
  }

  
}
