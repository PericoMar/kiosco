import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamilyService } from '../../services/family.service';
import { Product } from '../../interfaces/pedido';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from '../product/product.component';
import { FamilyTitleComponent } from './family-title/family-title.component';


@Component({
  selector: 'app-family-selected-page',
  standalone: true,
  imports: [ProductComponent, FamilyTitleComponent],
  templateUrl: './family-selected-page.component.html',
  styleUrl: './family-selected-page.component.css',
})
export class FamilySelectedPageComponent implements OnInit {

  family: any;
  products!: Product[];

  constructor(
    private route: ActivatedRoute,
    private familyService: FamilyService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef // Para forzar la detección de cambios
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      let id = paramMap.get('id')!;

      // Si no tiene conexión con el servidor 
      if (id === '') id = '1';
      this.updateFamilyData(id);
    });
  }

  private updateFamilyData(id: string): void {
    this.family = this.familyService.getFamilyById(id);
    this.products = this.productService.getProductsByFamilyId(id);
  }


}