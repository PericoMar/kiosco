import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '../table/table.component';
import { OverviewGraphComponent } from '../overview/overview-graph/overview-graph.component';
import { ProductsGraphComponent } from './products-graph/products-graph.component';
import { FamilyService } from '../../../../services/family.service';
import { FamilyData } from '../../../../interfaces/family-data';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-sales-manager',
  standalone: true,
  imports: [TableComponent, OverviewGraphComponent, ProductsGraphComponent, FormsModule],
  templateUrl: './sales-manager.component.html',
  styleUrl: './sales-manager.component.css'
})
export class SalesManagerComponent {
  startMonth!: string;
  endMonth!: string;

  displayedColumns!: { columnId: string, columnName: string }[];

  dataSource!: MatTableDataSource<any>;

  families! : FamilyData[];

  pageSizeOptions: number[] = [5, 10 ,20];

  heigth: string = '100%';

  familySelected: string = '';

  products : any[] = [];

  loadingData: boolean = false;

  constructor(
    private dialog : MatDialog,
    private familyService: FamilyService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.refreshTable(null);
    this.families = this.familyService.getFamiliesData();
    if(this.productService.keyExists()){
      this.products = this.productService.products;
    } else {
      this.productService.getProductsObservable().subscribe({
        next: (products) => {
          this.products = products;
        }
      })
    }

    const now = new Date();
    this.startMonth = this.getMonthString(now.getMonth(), now.getFullYear() - 1); // Un mes antes
    this.endMonth = this.getMonthString(now.getMonth(), now.getFullYear()); // Mes actual
  }

  getMonthString(month: number, year: number): string {
    return `${year}-${('0' + (month + 1)).slice(-2)}`; // Formato "YYYY-MM"
  }

 
  refreshTable(changes: any) {
    console.log('Recargar tabla de productos');
    this.loadingData = true;
    setTimeout(() => {
      this.displayedColumns = [
        { columnId: 'id', columnName: 'Código' },
        { columnId: 'numProducts', columnName: 'Nº Productos' },
        { columnId: 'amount', columnName: 'Importe' },
        { columnId: 'date', columnName: 'Fecha' },
        { columnId: 'iva', columnName: 'IVA' },
      ];
      
      this.dataSource = new MatTableDataSource<any>([
        { id: 1, numProducts: 3, amount: '30.00', date: '2024-10-28', iva: '21%' },
        { id: 2, numProducts: 2, amount: '18.50', date: '2024-10-28', iva: '10%' },
        { id: 3, numProducts: 5, amount: '55.00', date: '2024-10-28', iva: '21%' },
        { id: 4, numProducts: 1, amount: '1.50', date: '2024-10-28', iva: '10%' },
        { id: 5, numProducts: 4, amount: '48.00', date: '2024-10-28', iva: '21%' },
        { id: 6, numProducts: 3, amount: '9.00', date: '2024-10-28', iva: '10%' },
        { id: 7, numProducts: 2, amount: '10.00', date: '2024-10-28', iva: '21%' },
        { id: 8, numProducts: 6, amount: '24.00', date: '2024-10-28', iva: '21%' },
        { id: 9, numProducts: 1, amount: '1.80', date: '2024-10-28', iva: '10%' },
      ]);
      

      this.loadingData = false;
    }, 1000);
  }
  


  openSalesExportModal(productId: number | null = null): void {
    // const dialogRef = this.dialog.open(DeviceModalComponent, {
    //   width: '700px',
    //   data: { productId: productId }
    // });
  }
}
