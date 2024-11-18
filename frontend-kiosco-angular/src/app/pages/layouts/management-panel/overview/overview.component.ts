import { Component } from '@angular/core';
import { OverviewGraphComponent } from './overview-graph/overview-graph.component';
import { TableComponent } from '../table/table.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../modals/product-modal/product-modal.component';
import { ProductService } from '../../../../services/product.service';
import { FamilyService } from '../../../../services/family.service';
import { SnackbarService } from '../../../../services/snackBar/snackbar.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [OverviewGraphComponent, TableComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  startMonth!: string;
  endMonth!: string;

  constructor(private router : Router,
    private dialog : MatDialog,
    private productService : ProductService,
    private familyService : FamilyService,
    private snackbarService : SnackbarService
  ) { }

  families : any[] = [];

  ngOnInit() {
    this.familyService.getFamiliesObservable().subscribe({
      next: (families) => {
        this.families = families;
      }
    });

    const now = new Date();
    this.startMonth = this.getMonthString(now.getMonth(), now.getFullYear() - 1); // Un mes antes
    this.endMonth = this.getMonthString(now.getMonth(), now.getFullYear()); // Mes actual
  }

  getMonthString(month: number, year: number): string {
    return `${year}-${('0' + (month + 1)).slice(-2)}`; // Formato "YYYY-MM"
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  openProductModal(productId: number | null = null): void {
    if(this.families.length !== 0){
      this.productService.openProductModal(productId);
    } else {
      this.snackbarService.openSnackBar('Añada primero alguna familia en la pagina de familias.', 'Cerrar');
    }
  }

  
  // Función para obtener los alérgenos seleccionados como un array de strings
  private getSelectedAllergens(allergens: boolean[]): string[] {
    const allergenNames = [
      'gluten', 'lactosa', 'altramuces', 'huevos',
      'apio', 'cacahuetes', 'crustaceos', 'cascara',
      'mostaza', 'pescado', 'sesamo', 'soja',
      'dioxido-azufre', 'moluscos'
    ];
  
    return allergens
      .map((selected, index) => (selected ? allergenNames[index] : ''))
      .filter((allergen) => allergen !== null);
  }
  
  updateProduct(productId: number, productData: any) {
    // Lógica para actualizar producto
    console.log('Actualizar producto', productId, productData);
  }
}
