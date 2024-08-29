import { Component, Input, ViewChild} from '@angular/core';
import { Menu, Product } from '../../interfaces/pedido';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
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

  isMenu! : boolean;

  constructor(private orderService: OrderService,

  ) { 
    const item: Product | Menu = this.product; 
    this.isMenu = this.isMenuTypeGuard(item);
  }


  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

  // Type guard para determinar si es un Menu
  isMenuTypeGuard(item: Product | Menu): item is Menu {
    return (item as Menu).products !== undefined;
  }

  openConfirmModal(product: any): void {
    this.confirmModal.open(product);
  }

  onConfirm(quantity: number): void {
    this.orderService.addProduct(this.product as Product | Menu, quantity);
    console.log('Confirmado');
  }

  onCancel(): void {
    console.log('Cancelado');
  }

  
}
