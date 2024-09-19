import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Menu, Product } from '../../interfaces/pedido';
import { OrderService } from '../../services/order.service';
import { AppConfig } from '../../../config/app-config';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-product-suggested',
  standalone: true,
  imports: [ConfirmModalComponent],
  templateUrl: './product-suggested.component.html',
  styleUrl: './product-suggested.component.css'
})
export class ProductSuggestedComponent {
  @Input() product!: Product | Menu;

  // Emitir evento cuando se haga clic en el producto
  @Output() productSelected = new EventEmitter<Product | Menu>();

  noPhotoUrl = AppConfig.NO_PHOTO_URL;
  isMenu!:Boolean;

  constructor() {
  }

  selectProduct(){
    this.productSelected.emit(this.product)
  }

}
