import { Component } from '@angular/core';
import { OverviewGraphComponent } from './overview-graph/overview-graph.component';
import { TableComponent } from '../table/table.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../modals/product-modal/product-modal.component';

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
    private dialog : MatDialog
  ) { }

  ngOnInit() {
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
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '700px',
      data: { productId: productId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos recibidos del modal:', result);
        if (productId) {
          this.updateProduct(productId, result);
        } else {
          this.addProduct(result);
        }
      }
    });
  }

  addProduct(productData: any) {
    // Lógica para añadir producto
    console.log('Añadir producto', productData);
  }

  updateProduct(productId: number, productData: any) {
    // Lógica para actualizar producto
    console.log('Actualizar producto', productId, productData);
  }
}
