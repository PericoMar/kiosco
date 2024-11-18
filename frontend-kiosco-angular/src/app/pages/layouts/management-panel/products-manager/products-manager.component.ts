import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../modals/product-modal/product-modal.component';
import { ProductService } from '../../../../services/product.service';
import { max, min, Subscription } from 'rxjs';
import { ImportModalComponent } from '../modals/import-modal/import-modal.component';
import { FamilyService } from '../../../../services/family.service';
import { SnackbarService } from '../../../../services/snackBar/snackbar.service';

@Component({
  selector: 'app-products-manager',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './products-manager.component.html',
  styleUrl: './products-manager.component.css'
})
export class ProductsManagerComponent {
  pageSizeOptions: number[] = [10, 20 ,50];

  private productChangesSubscription!: Subscription;

  elementType: string = 'Productos';

  heigth: string = '60%';

  displayedColumns: { columnId: string, columnName: string }[] = [
    { columnId: 'id', columnName: 'Codigo' },
    { columnId: 'productType', columnName: 'Tipo' },
    { columnId: 'name', columnName: 'Nombre / Texto' },
    { columnId: 'family', columnName: 'Familia / Grupo / Producto' },
    { columnId: 'allergens', columnName: 'Alergenos' },
    { columnId: 'status', columnName: 'Estado' },
  ];

  dataSource!: MatTableDataSource<any>;

  loadingData: boolean = false;
  hayProductosSinFamilia: boolean = false;

  families : any[] = [];

  constructor(private dialog: MatDialog,
    private productService: ProductService,
    private familyService: FamilyService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.familyService.getFamiliesObservable().subscribe({
      next: (families) => {
        this.families = families;
      }
    });

    this.refreshTable(null);

    this.productChangesSubscription = this.productService.productChanged$.subscribe(changes => {
      this.refreshTable(changes);  // Llamar a la función para recargar la tabla
    });
  }

  refreshTable(changes: any) {
    console.log('Recargar tabla de productos');
    this.loadingData = true;
    this.productService.getProductsObservable().subscribe({
      next: (products) => {
        this.productService.products = products;
        this.dataSource = new MatTableDataSource<any>(this.productService.getProductsData());
        this.hayProductosSinFamilia = this.productService.getProductsData().some((product: any) => product.family === '');
        this.loadingData = false;

      }
    });
  }

  openProductModal(productId: number | null = null): void {
    if(this.families.length !== 0){
      this.productService.openProductModal(productId);
    } else {
      this.snackbarService.openSnackBar('Añada primero alguna familia en la pagina de familias', 'Cerrar');
    }
  }

  openImportModal(): void {
    const dialogRef = this.dialog.open(ImportModalComponent, {
      width: '700px',
      data: { elementType: this.elementType }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('Datos recibidos del modal:', result);
    //     console.log('ID del producto:', productId);
    //     if (productId) {
    //       this.updateProduct(productId, result);
    //     } else {
    //       this.addProduct(result);
    //     }
    //     this.dataSource = new MatTableDataSource<any>(this.productService.getProductsData());
    //   }
    // });
  }
}
