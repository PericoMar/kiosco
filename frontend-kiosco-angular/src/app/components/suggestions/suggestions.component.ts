import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Menu, Product } from '../../interfaces/pedido';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css'],
})
export class SuggestionsComponent implements OnInit {

  constructor(private product: ProductService) {}

  products: (Product | Menu)[] = [];

  ngOnInit(): void {
    // Cambiar por productos con sugerencia.
    this.products = this.product.getProductsByFamilyId('1');
  }
}
