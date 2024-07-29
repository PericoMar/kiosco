import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: Product;

  constructor(private orderService: OrderService) { }

  addToCart(product: Product) {
    // this.orderService.addProduct(product);
    // Abrir modal de confirmación
  }
}
