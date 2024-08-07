import { Component, Input, ViewChild} from '@angular/core';
import { Product } from '../../interfaces/product';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ConfirmModalComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: Product;

  constructor(
    private cartService: CartService,


  ) { }

  addThisProductToCart(product: Product){
    this.cartService.addProduct(product);
  }

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
