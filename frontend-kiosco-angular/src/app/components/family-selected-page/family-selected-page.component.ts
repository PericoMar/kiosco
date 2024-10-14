import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamilyService } from '../../services/family.service';
import { Menu, Product } from '../../interfaces/pedido';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-family-selected-page',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './family-selected-page.component.html',
  styleUrl: './family-selected-page.component.css',
})
export class FamilySelectedPageComponent implements OnInit {
  family: any;
  products!: (Product | Menu)[];

  constructor(
    private route: ActivatedRoute,
    private familyService: FamilyService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id')!;
      this.updateFamilyData(id);
    });
  }

  private updateFamilyData(id: string): void {
    this.family = this.familyService.getFamilyById(id);
    this.products = this.productService.getProductsByFamilyId(id);
  }
}
