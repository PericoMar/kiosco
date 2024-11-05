import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../modals/product-modal/product-modal.component';
import { ProductService } from '../../../../services/product.service';
import { max, min } from 'rxjs';
import { ImportModalComponent } from '../modals/import-modal/import-modal.component';

@Component({
  selector: 'app-products-manager',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './products-manager.component.html',
  styleUrl: './products-manager.component.css'
})
export class ProductsManagerComponent {
  pageSizeOptions: number[] = [10, 20 ,50];

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

  constructor(private dialog: MatDialog,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.productService.getProductsData());
  }


  openProductModal(productId: number | null = null): void {
    this.productService.openProductModal(productId);
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
