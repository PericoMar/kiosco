import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Product } from '../../interfaces/pedido';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductSuggestedComponent } from '../product-suggested/product-suggested.component';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [CommonModule, ProductSuggestedComponent],
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css'],
})
export class SuggestionsComponent implements OnInit {

  @Output() productSelected = new EventEmitter<Product>(); // Volver a emitir el evento al componente superior

  selectedProduct!: Product
  productsSugered: Product[] = [];
  isMenu!: boolean;
  isModalOpen = false;
  orderService: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Cambiar por productos con sugerencia.
    this.productsSugered = this.productService.getProductsByFamilyId('1');
  }

    // Función que maneja el evento emitido por el hijo
    onProductSelected(product: Product): void {
      this.productSelected.emit(product);  // Volver a emitir el producto al abuelo
    }
}
